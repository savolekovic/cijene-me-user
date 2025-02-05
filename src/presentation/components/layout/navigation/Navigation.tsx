import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Navigation.css';

const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // If we're already on home page, do nothing
    if (location.pathname === '/' && location.search) {
      return;
    }
    
    // Otherwise, go to home with default sorting
    navigate('/?order_by=created_at&order_direction=desc');
  };

  return (
    <nav className="navigation">
      <div className="nav-left">
        <a href="/" className="nav-logo" onClick={handleLogoClick}>
          Cijene.me
        </a>
      </div>
    </nav>
  );
};

export default Navigation; 