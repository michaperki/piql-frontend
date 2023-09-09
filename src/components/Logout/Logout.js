import React from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the access token from local storage
    localStorage.removeItem('access_token');
    
    // Redirect to the Home page or any other desired route
    navigate('/');
  };

  return (
    <div className="text-center">
      <button
        className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md font-medium hover:bg-red-600 transition duration-200"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}

export default Logout;
