const w = typeof window !== 'undefined' ? (window as any) : undefined;

export const environment = {
  production: false,
  BACKEND_URL: (w && w.__APP_BACKEND_URL__) || 'http://localhost:3001',
  WS_URL: (w && w.__APP_WS_URL__) || 'ws://localhost:3001/ws/events'
};
