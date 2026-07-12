#!/usr/bin/env bash
# One-shot forensic test against running webhook
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
URL="${1:-http://127.0.0.1:8080}"
SCENARIO="${2:-spoof_250km}"

echo "=== GeoSense Forensic Test ==="
echo "URL: $URL | Scenario: $SCENARIO"
echo ""

python3 "$ROOT/server/telemetry_simulator.py" --url "$URL" --scenario "$SCENARIO"
