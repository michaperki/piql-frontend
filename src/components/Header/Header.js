import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../Navigation';

const Header = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/">
          <img
            src={`${process.env.PUBLIC_URL}/logo_dark.png`}
            alt="Piql Logo" className="h-10" />
        </Link>
        <button
          className="lg:hidden text-white text-xl"
          onClick={toggleMobileMenu}
        >
          Menu
        </button>
        <nav className={`lg:flex lg:space-x-4 ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
          <Navigation />
        </nav>
      </div>
    </header>
  );
};

export default Header;
