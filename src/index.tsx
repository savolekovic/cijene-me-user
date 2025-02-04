import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { type Metric } from 'web-vitals';
import App from './App';
import { queryClient } from './infrastructure/api/queryClient';
import reportWebVitals from './core/utils/reportWebVitals';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
    <Analytics />
  </React.StrictMode>
);

reportWebVitals((metric: Metric) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(metric);
  }
}); 