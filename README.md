# voiceassist-pro-225512-225522

This repo contains the admin dashboard frontend (Angular). It connects to the core backend (FastAPI, port 3001) and Mongo data store.

Quick wiring:
- REST: BACKEND_URL (default http://localhost:3001)
- WS: WS_URL (default ws://localhost:3001/ws/events)
- Backend DB: MONGODB_URL and MONGODB_DB

See RUNBOOK.md for cross-container integration and E2E smoke steps.