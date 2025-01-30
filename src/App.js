import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './presentation/pages/HomePage/HomePage';
import Navigation from './presentation/components/layout/navigation/Navigation';
import ProductHistory from './presentation/pages/ProductHistory/ProductHistory';
import NotFound from './presentation/pages/NotFound/NotFound';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products/:id/history" element={<ProductHistory />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
