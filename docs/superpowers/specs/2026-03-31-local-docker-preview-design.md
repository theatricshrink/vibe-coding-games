# Local Docker Preview — Design

**Date:** 2026-03-31

## Goal

Provide a fast, zero-build local preview of the games before pushing to production.

## Approach

A single `preview.sh` script at the repo root. It uses `docker run` with a volume mount — no Dockerfile, no build step required.

## What It Does

1. Checks Docker is running; exits with a clear error message if not.
2. Runs `nginx:alpine` with the project directory mounted read-only at `/usr/share/nginx/html`.
3. Binds to `localhost:8080`.
4. Prints: `Preview running at http://localhost:8080 — Ctrl+C to stop`
5. On Ctrl+C, the container stops and removes itself (`--rm` flag).

## Key Properties

- **Live edits:** File changes are reflected on browser refresh — no rebuild needed.
- **No cleanup required:** `--rm` ensures the container is deleted on exit.
- **Minimal dependencies:** Only requires Docker to be installed and running.

## Files Changed

- `preview.sh` — new file at repo root, chmod +x
