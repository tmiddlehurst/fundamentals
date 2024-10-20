import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import axios from 'axios';
import { BASE_PATH } from './types/generated/base.ts';

async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') {
    axios.defaults.baseURL = BASE_PATH;
    return;
  }
  const { worker } = await import('./mock/browser');
  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start();
}

function mountApp() {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
  console.log('mounted app');
}

enableMocking().then(mountApp);
