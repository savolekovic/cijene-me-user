import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

const Navigation: React.FC = () => {
  return (
    <nav className="navigation">
      <div className="nav-left">
        <Link to="/" className="nav-logo">
          Cijene.me
        </Link>
      </div>
    </nav>
  );
};

export default Navigation; 