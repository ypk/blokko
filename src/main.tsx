import { StrictMode } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import './index.css';
import Blokko from './Blokko';

const rootElement: HTMLElement | null = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found.');
}

const root: Root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Blokko />
  </StrictMode>
);

