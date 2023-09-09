import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../Navigation';
import Logout from '../Logout';

const Header = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  // Check if the user is authenticated
  const isAuthenticated = !!localStorage.getItem('access_token');

  return (
    <header className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/">
          <img
            src={`${process.env.PUBLIC_URL}/logo_dark.png`}
            alt="Piql Logo" className="h-10" />
        </Link>
        {isAuthenticated && ( // Render "Menu" button only if authenticated
          <button
            className="lg:hidden text-white text-xl"
            onClick={toggleMobileMenu}
          >
            Menu
          </button>
        )}
        {isAuthenticated ? ( // Render navigation and logout button if authenticated
          <nav className={`lg:flex lg:space-x-4 ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
            <Navigation />
            <Logout />
          </nav>
        ) : null}
      </div>
    </header>
  );
};

export default Header;
