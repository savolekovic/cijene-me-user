import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './presentation/pages/HomePage/HomePage';
import ProductHistory from './presentation/pages/ProductHistory/ProductHistory';
import NotFound from './presentation/pages/NotFound/NotFound';
import Navigation from './presentation/components/layout/navigation/Navigation';
import './App.css';

const App: React.FC = () => {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products/:id/history" element={<ProductHistory />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App; 