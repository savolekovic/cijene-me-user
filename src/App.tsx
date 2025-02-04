import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './presentation/components/layout/navigation/Navigation';
import LoadingSpinner from './presentation/components/common/LoadingSpinner/LoadingSpinner';
import './App.css';

// Lazy load pages
const HomePage = React.lazy(() => import('./presentation/pages/HomePage/HomePage'));
const ProductHistory = React.lazy(() => import('./presentation/pages/ProductHistory/ProductHistory'));
const NotFound = React.lazy(() => import('./presentation/pages/NotFound/NotFound'));

const App: React.FC = () => {
  return (
    <div className="app">
      <Navigation />
      <main>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products/:id/history" element={<ProductHistory />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
};

export default App; 