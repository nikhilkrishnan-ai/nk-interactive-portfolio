#!/usr/bin/env bash
# Phase 2 — enable Azure Event Hub → Microsoft Fabric stream
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ENV_FILE="$ROOT/server/.env"

if [ ! -f "$ENV_FILE" ]; then
  echo "Missing $ENV_FILE"
  echo "Copy server/.env.example → server/.env and paste your Event Hub connection string."
  exit 1
fi

echo "=== GeoSense Phase 2 — Fabric Stream Enabled ==="
set -a
# shellcheck disable=SC1090
source "$ENV_FILE"
set +a

if [ -z "${EVENT_HUB_CONNECTION_STR:-}" ]; then
  echo "EVENT_HUB_CONNECTION_STR is empty in server/.env"
  exit 1
fi

echo "Event Hub: ${EVENT_HUB_NAME:-esehpn8bkui7d5e033f3x1_eh}"
echo "Port: ${PORT:-8080}"
echo ""

exec bash "$ROOT/server/start_phase1.sh"
