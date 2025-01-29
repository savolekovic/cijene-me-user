import React from 'react';
import './Navigation.css';

const Navigation = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-white sticky-top shadow-sm">
      <div className="container py-2">
        <a className="navbar-brand nav-logo" href="#">Cijene.me</a>
        <button className="btn btn-primary px-4">
          Prijava {/* Login */}
        </button>
      </div>
    </nav>
  );
};

export default Navigation; 