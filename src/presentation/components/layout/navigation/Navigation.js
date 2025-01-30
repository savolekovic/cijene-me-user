import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom">
      <div className="container">
        <Link to="/" className="nav-logo">
          Cijene.me
        </Link>
      </div>
    </nav>
  );
};

export default Navigation; 