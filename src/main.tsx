import { StrictMode } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import './index.css';
import Game from './components/Game';

const rootElement: HTMLElement | null = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found.');
}

const root: Root = createRoot(rootElement);

root.render(
  <StrictMode>
    <HelmetProvider>
      <Game />
    </HelmetProvider>
  </StrictMode>
);