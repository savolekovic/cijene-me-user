import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navigation.css';

const Navigation: React.FC = () => {
  const navigate = useNavigate();

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/?page=1&per_page=20&order_by=created_at&order_direction=desc');
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