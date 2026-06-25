import os
import sys
import json
import functions_framework
from azure.eventhub import EventHubProducerClient, EventData

# 🚨 SECURITY FIX: Load sensitive credentials from environment variables to prevent GitHub Secret Scanning blocks.
# We fetch this dynamically from GCloud Run's RAM environment variables instead of hardcoding.
EVENT_HUB_CONNECTION_STR = os.environ.get("EVENT_HUB_CONNECTION_STR")
EVENT_HUB_NAME = os.environ.get("EVENT_HUB_NAME", "esehpn8bkui7d5e033f3x1_eh")

@functions_framework.http
def hello_http(request):
    # 1. Favicon റിക്വസ്റ്റുകൾ അവഗണിക്കുന്നു
    if request.path == '/favicon.ico':
        return '', 204
        
    # 2. Check if configuration is missing from the environment
    if not EVENT_HUB_CONNECTION_STR:
        print("FATAL ERROR: EVENT_HUB_CONNECTION_STR environment variable is not configured!", file=sys.stderr)
        return jsonify_response({
            "status": "error", 
            "message": "Backend Configuration Error: Missing connection parameters on Google Cloud."
        }, 500)
        
    # 3. പോസ്റ്റ് വഴി വരുന്ന ബോഡി ഡാറ്റ റീഡ് ചെയ്യുന്നു
    request_json = request.get_json(silent=True)
    
    if request_json:
        # ടെർമക്സിൽ നിന്നുള്ള അസംസ്കൃത ഡാറ്റ ക്ലൗഡ് കൺസോളിൽ പ്രിന്റ് ചെയ്യുന്നു
        print(f"Data received from Termux: {request_json}")
        
        # പേലോഡ് പാക്കറ്റ് ക്രിയേറ്റ് ചെയ്യുന്നു
        payload = {
            "latitude": request_json.get('latitude'),
            "longitude": request_json.get('longitude'),
            "speed": request_json.get('speed', 0.0),
            "device_id": request_json.get('device_id', 'Termux_Node_Alpha'),
            "message": str(request_json.get('message', 'Telemetry Stream Active'))
        }
        
        try:
            # 4. Azure Event Hub വഴിയുള്ള എന്റർപ്രൈസ് കണക്ഷൻ
            producer = EventHubProducerClient.from_connection_string(
                conn_str=EVENT_HUB_CONNECTION_STR, 
                eventhub_name=EVENT_HUB_NAME
            )
            with producer:
                # ഡാറ്റ എക്സ്പ്രസ്സ് ബാച്ച് ആയി പാക്ക് ചെയ്യുന്നു
                event_data_batch = producer.create_batch()
                event_data_batch.add(EventData(json.dumps(payload)))
                
                # മൈക്രോസോഫ്റ്റ് ഫാബ്രിക്കിലേക്ക് ഡാറ്റ പായിക്കുന്നു!
                producer.send_batch(event_data_batch)
                
            print("Successfully sent to Microsoft Fabric Eventstream! 🔥")
            return jsonify_response({"status": "success", "message": "Telemetry forwarded to Microsoft Fabric! 🚀"}, 200)
            
        except Exception as e:
            print(f"Error sending to Fabric: {e}", file=sys.stderr)
            return jsonify_response({"status": "error", "message": f"Fabric Connection Fault: {str(e)}"}, 500)
            
    return jsonify_response({"status": "error", "message": "Empty or Invalid JSON payload received"}, 400)

def jsonify_response(data, status_code):
    """സെർവറിൽ നിന്ന് ജെസൺ റെസ്പോൺസ് റിട്ടേൺ ചെയ്യാനുള്ള ഹെൽപ്പർ"""
    return json.dumps(data), status_code, {'Content-Type': 'application/json'}
