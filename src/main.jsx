import React from 'react';
import ReactDOM from 'react-dom/client';
import { registerSW } from 'virtual:pwa-register';
import Start from './Start.jsx';
import './index.css';

registerSW({
  immediate: true,
});


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Start />
  </React.StrictMode>,
);
