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
