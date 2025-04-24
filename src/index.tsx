import './index.css';
import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";

console.log('Starting app initialization...');

const container = document.getElementById("root");
console.log('Root element found:', !!container);

if (!container) throw new Error('Failed to find the root element');
const root = createRoot(container);

console.log('Created React root, attempting to render...');

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);