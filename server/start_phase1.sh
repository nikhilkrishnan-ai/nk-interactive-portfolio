#!/usr/bin/env bash
# Phase 1 — forensic engine + webhook on Ubuntu server (no Event Hub / no Termux)
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo "=== GeoSense Phase 1 — Local Forensic Webhook ==="
echo "Repo: $ROOT"
echo "Mode: forensic analysis only (Event Hub disabled until server/.env is configured)"
echo ""

if [ ! -d ".venv" ]; then
  echo "Creating Python venv..."
  python3 -m venv .venv
fi

# shellcheck disable=SC1091
source .venv/bin/activate
pip install -q -r requirements.txt

export PORT="${PORT:-8080}"
export GEOSENSE_SPEED_THRESHOLD_KMH="${GEOSENSE_SPEED_THRESHOLD_KMH:-1000}"

echo "Listening on http://0.0.0.0:${PORT}"
echo "Fire test (new terminal): python3 server/telemetry_simulator.py --scenario spoof_250km"
echo ""

exec functions-framework \
  --target=hello_http \
  --source=python_gps_webhook.py \
  --port="${PORT}" \
  --host=0.0.0.0
