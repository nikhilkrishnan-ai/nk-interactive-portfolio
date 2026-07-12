#!/usr/bin/env python3
"""
GeoSense edge telemetry simulator — Ubuntu server replacement for Termux.
Posts GPS JSON payloads to the local webhook (Phase 1) or Fabric-enabled webhook (Phase 2).
"""
from __future__ import annotations

import argparse
import json
import sys
import time
import urllib.error
import urllib.request

# Case #250-KM coordinates (Abu Dhabi → Ruwais spoof)
ABU_DHABI = {"latitude": 24.4539, "longitude": 54.3773}
RUWAIS_SPOOF = {"latitude": 24.1100, "longitude": 52.7300}
LEGIT_NEARBY = {"latitude": 24.4545, "longitude": 54.3780}

SCENARIOS = {
    "legit": [
        {"ts": "2026-04-07 03:19:00", **ABU_DHABI, "message": "Baseline ping — Abu Dhabi"},
        {"ts": "2026-04-07 03:19:30", **LEGIT_NEARBY, "message": "Normal movement — 30s later"},
    ],
    "spoof_250km": [
        {"ts": "2026-04-07 03:19:00", **ABU_DHABI, "message": "Baseline ping — Abu Dhabi"},
        {"ts": "2026-04-07 03:19:01", **RUWAIS_SPOOF, "message": "SPOOF ATTEMPT — Ruwais jump"},
    ],
}


def post_ping(url: str, device_id: str, point: dict) -> dict:
    payload = {
        "latitude": point["latitude"],
        "longitude": point["longitude"],
        "speed": point.get("speed", 0.0),
        "device_id": device_id,
        "timestamp": point["ts"],
        "message": point.get("message", "Telemetry Stream Active"),
    }
    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(
        url,
        data=data,
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=30) as resp:
        body = resp.read().decode("utf-8")
        return json.loads(body)


def run_scenario(url: str, scenario: str, device_id: str, delay_sec: float) -> int:
    points = SCENARIOS.get(scenario)
    if not points:
        print(f"Unknown scenario: {scenario}", file=sys.stderr)
        return 1

    print(f"--- GeoSense Telemetry Simulator ---")
    print(f"Target: {url}")
    print(f"Scenario: {scenario} | Device: {device_id}")
    print()

    exit_code = 0
    for i, point in enumerate(points, start=1):
        print(f"[{i}/{len(points)}] POST lat={point['latitude']} lon={point['longitude']} ts={point['ts']}")
        try:
            result = post_ping(url, device_id, point)
            print(json.dumps(result, indent=2))
            forensic = result.get("forensic_analysis", {})
            status = forensic.get("status", "UNKNOWN")
            if status in {"SPOOFED", "ANOMALY"}:
                print(f">>> ALERT: {status} — velocity={forensic.get('calculated_velocity_kmh', 'N/A')} km/h")
            elif status == "BASELINE":
                print(">>> BASELINE stored — next ping will trigger forensic comparison")
            elif status == "LEGITIMATE":
                print(">>> LEGITIMATE trajectory verified")
        except urllib.error.HTTPError as e:
            print(f"HTTP {e.code}: {e.read().decode('utf-8', errors='replace')}", file=sys.stderr)
            exit_code = 1
            break
        except urllib.error.URLError as e:
            print(f"Connection failed: {e.reason}", file=sys.stderr)
            print("Is the webhook running? Try: bash server/start_phase1.sh", file=sys.stderr)
            exit_code = 1
            break

        if i < len(points) and delay_sec > 0:
            time.sleep(delay_sec)
        print()

    return exit_code


def main() -> int:
    parser = argparse.ArgumentParser(description="GeoSense Ubuntu edge telemetry simulator")
    parser.add_argument(
        "--url",
        default="http://127.0.0.1:8080",
        help="Webhook base URL (default: http://127.0.0.1:8080)",
    )
    parser.add_argument(
        "--scenario",
        choices=sorted(SCENARIOS.keys()),
        default="spoof_250km",
        help="Telemetry sequence to fire",
    )
    parser.add_argument(
        "--device-id",
        default="Ubuntu_Edge_Node",
        help="Simulated device identifier",
    )
    parser.add_argument(
        "--delay",
        type=float,
        default=1.0,
        help="Seconds between pings",
    )
    args = parser.parse_args()
    return run_scenario(args.url.rstrip("/"), args.scenario, args.device_id, args.delay)


if __name__ == "__main__":
    sys.exit(main())
