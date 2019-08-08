import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <div className="container">
    <nav className="navbar navbar-light bg-primary">
      <span className="navbar-brand mb-0 h1 text-white"><Link to="/" style={{ textDecoration: 'none', color: '#FFFFFF' }}>Baseball!</Link></span>
    </nav>
  </div>
);

export default Header;