import { StrictMode } from 'react';
import { createRoot, Root } from 'react-dom/client';
import './index.css';
import Game from './components/Game';

const rootElement: HTMLElement | null = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found. Make sure you have a div with id="root" in your HTML.');
}

const root: Root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Game />
  </StrictMode>
);