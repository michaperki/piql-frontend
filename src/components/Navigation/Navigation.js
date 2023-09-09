import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = ({ onClose }) => {
  return (
    <nav className="lg:flex lg:space-x-4">
      <ul className="lg:flex lg:space-x-4">
        <li>
          <Link
            to="/dashboard"
            onClick={onClose}
            className="block text-white hover:text-gray-400 py-2 px-2 lg:px-0"
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/calendar"
            onClick={onClose}
            className="block text-white hover:text-gray-400 py-2 px-2 lg:px-0"
          >
            Calendar
          </Link>
        </li>
        <li>
          <Link
            to="/games"
            onClick={onClose}
            className="block text-white hover:text-gray-400 py-2 px-2 lg:px-0"
          >
            Games
          </Link>
        </li>
        <li>
          <Link
            to="/social"
            onClick={onClose}
            className="block text-white hover:text-gray-400 py-2 px-2 lg:px-0"
          >
            Social
          </Link>
        </li>
        <li>
          <Link
            to="/settings"
            onClick={onClose}
            className="block text-white hover:text-gray-400 py-2 px-2 lg:px-0"
          >
            Settings
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
