import { useState, useEffect } from 'react';
import type { WebApp } from '../types';

declare global {
  interface Window {
    Telegram?: {
      WebApp: WebApp;
    };
  }
}

export function useTelegram() {
  const [webApp, setWebApp] = useState<WebApp | null>(null);

  useEffect(() => {
    if (window.Telegram) {
      const app = window.Telegram.WebApp;
      app.ready();
      setWebApp(app);
    }
  }, []);

  return {
    webApp,
    user: webApp?.initDataUnsafe?.user || null,
  };
}
