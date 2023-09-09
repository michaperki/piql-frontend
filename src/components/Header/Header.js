import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../Navigation';
import Logout from '../Logout';
import useOutsideClick from '../../hooks/useOutsideClick';
import './Header.css';

const Header = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null); // Create a ref for the mobile menu

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  // Check if the user is authenticated
  const isAuthenticated = !!localStorage.getItem('access_token');

  // Callback function to close the mobile menu
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // Attach the outside click listener to the mobile menu
  useOutsideClick(mobileMenuRef, closeMobileMenu);

  // Prevent click propagation when clicking the "Menu" button
  const preventPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <header className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/">
          <img
            src={`${process.env.PUBLIC_URL}/logo_dark.png`}
            alt="Piql Logo"
            className="h-10"
          />
        </Link>
        {isAuthenticated && (
          <button
            className="lg:hidden text-white text-xl"
            onClick={(e) => {
              toggleMobileMenu();
              preventPropagation(e); // Prevent click propagation
            }}
          >
            Menu
          </button>
        )}
        {isAuthenticated && (
          <nav className="hidden lg:block"> {/* Display navigation on larger screens */}
            <Navigation />
          </nav>
        )}
      </div>

      {isAuthenticated && (
        <div
          ref={mobileMenuRef} // Assign the ref to the mobile menu
          className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}
        >
          <nav>
            <Navigation onClose={closeMobileMenu} />
          </nav>
          <Logout />
        </div>
      )}
    </header>
  );
};

export default Header;
