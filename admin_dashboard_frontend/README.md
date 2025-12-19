# Angular

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.1.

## Environment configuration
The app reads backend URLs from environment files:
- src/environments/environment.ts
- src/environments/environment.prod.ts

Defaults:
- BACKEND_URL=http://localhost:3001
- WS_URL=ws://localhost:3001/ws/events

You can override at runtime by injecting global variables (before app-root):
```html
<script>
  window.__APP_BACKEND_URL__ = 'http://localhost:3001';
  window.__APP_WS_URL__ = 'ws://localhost:3001/ws/events';
</script>
```

If you are on a preview environment, set the host accordingly:
- Example: BACKEND_URL=https://<preview-host>:3001
- Example: WS_URL=wss://<preview-host>:3001/ws/events

## Validations / E2E smoke
- Home page performs health check against GET {BACKEND_URL}/health every 15s
- Home page loads a minimal seeded calls list from GET {BACKEND_URL}/calls?limit=10 (if endpoint exists)
- Live Calls page connects to WebSocket at {WS_URL} and will show live rows if backend emits events.
  - If WS connection fails, a mock generator produces demo events so the UI still demonstrates behavior.

## CORS / WebSocket notes
- If you encounter CORS errors on REST:
  - Ensure backend allows origin http://localhost:3000 and any preview domain used by this frontend.
- If WS fails to connect because of origin:
  - Ensure backend WS server accepts the Origin header from http://localhost:3000 and preview hosts.
  - If using TLS on preview, prefer wss:// scheme in WS_URL.

## Development server
To start a local development server, run:
```bash
ng serve
```
Open `http://localhost:3000/` as this project is configured to run on port 3000.

## Building
```bash
ng build
```

## Tests
```bash
ng test
```

## Notes
- All @angular/* packages are pinned to 19.2.1 to avoid version mismatch errors.
- SSR/server.ts is configured; to run SSR build use:
```bash
ng build && node dist/angular/server/server.mjs
```

For additional Angular CLI usage, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
