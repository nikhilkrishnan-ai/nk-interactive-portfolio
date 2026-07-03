import os
import sys
import json
from datetime import datetime, timezone

import functions_framework
from azure.eventhub import EventHubProducerClient, EventData

from geosense_engine_core import GeoSenseEngine

# 🚨 SECURITY FIX: Load sensitive credentials from environment variables to prevent GitHub Secret Scanning blocks.
EVENT_HUB_CONNECTION_STR = os.environ.get("EVENT_HUB_CONNECTION_STR")
EVENT_HUB_NAME = os.environ.get("EVENT_HUB_NAME", "esehpn8bkui7d5e033f3x1_eh")
GEOSENSE_SPEED_THRESHOLD_KMH = int(os.environ.get("GEOSENSE_SPEED_THRESHOLD_KMH", "1000"))

forensic_engine = GeoSenseEngine(speed_threshold=GEOSENSE_SPEED_THRESHOLD_KMH)
_device_last_point = {}
TIMESTAMP_FMT = "%Y-%m-%d %H:%M:%S"


def jsonify_response(data, status_code):
    """സെർവറിൽ നിന്ന് ജെസൺ റെസ്പോൺസ് റിട്ടേൺ ചെയ്യാനുള്ള ഹെൽപ്പർ"""
    return json.dumps(data), status_code, {"Content-Type": "application/json"}


def normalize_timestamp(raw_timestamp):
    """Accept client timestamps or fall back to UTC server time."""
    if not raw_timestamp:
        return datetime.now(timezone.utc).strftime(TIMESTAMP_FMT)

    if isinstance(raw_timestamp, (int, float)):
        return datetime.fromtimestamp(raw_timestamp, tz=timezone.utc).strftime(TIMESTAMP_FMT)

    value = str(raw_timestamp).strip()
    for fmt in (TIMESTAMP_FMT, "%Y-%m-%dT%H:%M:%S", "%Y-%m-%dT%H:%M:%SZ"):
        try:
            return datetime.strptime(value.replace("Z", ""), fmt.replace("Z", "")).strftime(TIMESTAMP_FMT)
        except ValueError:
            continue

    try:
        return datetime.fromisoformat(value.replace("Z", "+00:00")).strftime(TIMESTAMP_FMT)
    except ValueError:
        return datetime.now(timezone.utc).strftime(TIMESTAMP_FMT)


def build_telemetry_point(latitude, longitude, timestamp=None):
    return {
        "lat": float(latitude),
        "lon": float(longitude),
        "timestamp": normalize_timestamp(timestamp),
    }


def run_forensic_analysis(device_id, latitude, longitude, timestamp=None):
    """Compare the incoming ping with the last stored ping for this device."""
    if latitude is None or longitude is None:
        return {"status": "SKIPPED", "reason": "Missing latitude or longitude"}

    try:
        current_point = build_telemetry_point(latitude, longitude, timestamp)
    except (TypeError, ValueError):
        return {"status": "ERROR", "reason": "Invalid coordinate payload"}

    previous_point = _device_last_point.get(device_id)
    _device_last_point[device_id] = current_point

    if not previous_point:
        return {
            "status": "BASELINE",
            "reason": "First telemetry point stored for device",
            "timestamp": current_point["timestamp"],
        }

    analysis = forensic_engine.analyze_trajectory(previous_point, current_point)
    analysis["previous_timestamp"] = previous_point["timestamp"]
    analysis["current_timestamp"] = current_point["timestamp"]
    return analysis


@functions_framework.http
def hello_http(request):
    if request.path == "/favicon.ico":
        return "", 204

    request_json = request.get_json(silent=True)
    if not request_json:
        return jsonify_response(
            {"status": "error", "message": "Empty or Invalid JSON payload received"},
            400,
        )

    print(f"Telemetry received from edge node: {request_json}")

    device_id = request_json.get("device_id", "Ubuntu_Edge_Node")
    latitude = request_json.get("latitude")
    longitude = request_json.get("longitude")
    forensic_report = run_forensic_analysis(
        device_id,
        latitude,
        longitude,
        request_json.get("timestamp"),
    )

    payload = {
        "latitude": latitude,
        "longitude": longitude,
        "speed": request_json.get("speed", 0.0),
        "device_id": device_id,
        "message": str(request_json.get("message", "Telemetry Stream Active")),
        "timestamp": normalize_timestamp(request_json.get("timestamp")),
        "forensic_analysis": forensic_report,
    }

    if forensic_report.get("status") in {"SPOOFED", "ANOMALY"}:
        print(
            f"GEOSENSE ALERT [{device_id}]: {forensic_report['status']} "
            f"- velocity={forensic_report.get('calculated_velocity_kmh', 'N/A')} km/h "
            f"- threat={forensic_report.get('threat_level', 'UNKNOWN')}",
            file=sys.stderr,
        )

    response_body = {
        "status": "success",
        "forensic_analysis": forensic_report,
        "phase": "local" if not EVENT_HUB_CONNECTION_STR else "fabric",
    }
    if forensic_report.get("status") in {"SPOOFED", "ANOMALY"}:
        response_body["alert"] = "GPS spoofing anomaly detected"

    if not EVENT_HUB_CONNECTION_STR:
        print("Phase 1 local mode: forensic analysis complete (Event Hub not configured).")
        response_body["message"] = (
            "Telemetry analyzed on Ubuntu edge node. "
            "Set EVENT_HUB_CONNECTION_STR in server/.env to enable Phase 2 Fabric stream."
        )
        return jsonify_response(response_body, 200)

    try:
        producer = EventHubProducerClient.from_connection_string(
            conn_str=EVENT_HUB_CONNECTION_STR,
            eventhub_name=EVENT_HUB_NAME,
        )
        with producer:
            event_data_batch = producer.create_batch()
            event_data_batch.add(EventData(json.dumps(payload)))
            producer.send_batch(event_data_batch)

        print("Phase 2: successfully sent to Microsoft Fabric Eventstream!")
        response_body["message"] = "Telemetry analyzed and forwarded to Microsoft Fabric!"
        return jsonify_response(response_body, 200)

    except Exception as e:
        print(f"Error sending to Fabric: {e}", file=sys.stderr)
        return jsonify_response(
            {"status": "error", "message": f"Fabric Connection Fault: {str(e)}"},
            500,
        )
