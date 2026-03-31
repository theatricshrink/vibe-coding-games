#!/usr/bin/env bash
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

if ! docker info > /dev/null 2>&1; then
  echo "Error: Docker is not running. Please start Docker and try again."
  exit 1
fi

echo "Preview running at http://localhost:8181 — Ctrl+C to stop"

docker run --rm \
  --name vibe-games-preview \
  -v "$SCRIPT_DIR":/usr/share/nginx/html:ro \
  -p 8181:80 \
  nginx:alpine
