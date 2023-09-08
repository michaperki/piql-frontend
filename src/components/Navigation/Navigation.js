import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="lg:flex lg:space-x-4">
      <ul className="lg:flex lg:space-x-4">
        <li>
          <Link
            to="/dashboard"
            className="block text-white hover:text-gray-400 py-2 px-2 lg:px-0"
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/calendar"
            className="block text-white hover:text-gray-400 py-2 px-2 lg:px-0"
          >
            Calendar
          </Link>
        </li>
        <li>
          <Link
            to="/games"
            className="block text-white hover:text-gray-400 py-2 px-2 lg:px-0"
          >
            Games
          </Link>
        </li>
        <li>
          <Link
            to="/settings"
            className="block text-white hover:text-gray-400 py-2 px-2 lg:px-0"
          >
            Settings
          </Link>
        </li>
        <li>
          <Link
            to="/social"
            className="block text-white hover:text-gray-400 py-2 px-2 lg:px-0"
          >
            Social
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
