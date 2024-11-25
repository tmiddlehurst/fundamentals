import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { makeServer } from './mirage/server.ts';
import { AxiosApiProvider } from './context/AxiosAPIContext.tsx';
// import { BASE_PATH } from './types/generated/base.ts';

makeServer();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AxiosApiProvider>
      <App />
    </AxiosApiProvider>
  </StrictMode>
);
