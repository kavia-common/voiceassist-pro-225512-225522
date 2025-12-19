# VoiceAssist Pro - Runbook (Cross-Container Wiring)

This runbook summarizes how the containers integrate and what to verify.

## Components
- core_backend_api (FastAPI) on port 3001
  - REST: http://localhost:3001
  - WS: ws://localhost:3001/ws/events
  - Database: MongoDB via env MONGODB_URL and MONGODB_DB
- admin_dashboard_frontend (Angular) on port 3000
  - Reads backend endpoints from environment files or window globals
- data_store (MongoDB)

## Environment
Frontend environment defaults:
- BACKEND_URL=http://localhost:3001
- WS_URL=ws://localhost:3001/ws/events

You can override at runtime in index.html before app-root:
<script>
  window.__APP_BACKEND_URL__ = 'http://localhost:3001';
  window.__APP_WS_URL__ = 'ws://localhost:3001/ws/events';
</script>

For preview envs, use the preview host and wss:// if TLS is required.

Backend must read:
- MONGODB_URL
- MONGODB_DB

Do not hardcode DB connection strings; ensure they come from environment (.env managed by platform).

## E2E Smoke Checklist
1) Start backend on 3001. Confirm:
   - GET /health returns 200 with JSON status
   - WS /ws/events accepts connections and pushes events (or leave idle)
2) Start frontend on 3000.
   - Home page shows "Healthy" after polling /health
   - Home page displays a "Recent Seeded Calls" table if GET /calls?limit=10 is available
   - Live Calls page shows "Connected" if WS is reachable, and real-time rows when events arrive
   - If WS cannot connect, the UI falls back to mock events (for demo)
3) If you observe CORS issues:
   - Allow origin http://localhost:3000 and preview domains on backend CORS config
   - For WS, accept Origin header for the same domains

## Troubleshooting
- REST 4xx/5xx:
  - Verify BACKEND_URL points to the correct host/port and backend is running
  - Check backend logs and CORS settings
- WS fails to connect:
  - Ensure WS_URL is ws://localhost:3001/ws/events (or wss://<host>/ws/events with TLS)
  - Verify backend WS route exists and origin is allowed
- Mongo errors in backend:
  - Ensure MONGODB_URL and MONGODB_DB are defined and valid
  - Check connectivity to the data_store container/cluster

## Notes
- No change to start/preview processes required.
