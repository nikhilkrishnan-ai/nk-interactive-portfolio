import os
import sys
import json
import functions_framework
from azure.eventhub import EventHubProducerClient, EventData

# 🚨 SECURITY FIX: Load sensitive credentials from environment variables to prevent GitHub Secret Scanning blocks.
# We fetch this dynamically from GCloud Run's RAM environment variables instead of hardcoding.
EVENT_HUB_CONNECTION_STR = os.environ.get("EVENT_HUB_CONNECTION_STR")
EVENT_HUB_NAME = os.environ.get("EVENT_HUB_NAME", "esehpn8bkui7d5e033f3x1_eh")
