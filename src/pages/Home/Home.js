import React, { useState, useEffect } from "react";
import Register from "../../components/Register";
import Login from "../../components/Login";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  // State to track the user's authentication status
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  // Function to check if the user is authenticated based on localStorage
  const checkAuthentication = () => {
    const accessToken = localStorage.getItem("access_token");
    setIsAuthenticated(accessToken !== null);
  };

  useEffect(() => {
    // Check authentication status when the component mounts
    checkAuthentication();
  }, []); // Empty dependency array to run the effect once

  const openLoginModal = () => {
    setShowLoginModal(true);
  };

  const closeLoginModal = () => {
    setShowLoginModal(false);
  };

  const openRegisterModal = () => {
    setShowRegisterModal(true);
  };

  const closeRegisterModal = () => {
    setShowRegisterModal(false);
  };

  // Function to redirect to the Dashboard when authenticated
  const redirectToDashboard = () => {
    navigate("/dashboard"); // Redirect to the Dashboard route
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
      <h1 className="text-3xl font-extrabold mb-6">Welcome to</h1>

      <img
        src={`${process.env.PUBLIC_URL}/logo.png`}
        alt="Piql Logo"
        className="mb-6"
        style={{ width: "200px", height: "auto" }}
      />

      {/* Conditionally render login and register buttons */}
      {!isAuthenticated && (
        <>
          <button
            onClick={openLoginModal}
            className="px-4 py-2 bg-indigo-500 text-white rounded-md font-medium hover:bg-indigo-600 transition duration-200"
          >
            Login
          </button>
          <button
            onClick={openRegisterModal}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md font-medium hover:bg-blue-600 transition duration-200"
          >
            Register
          </button>
        </>
      )}

      {isAuthenticated && (
        <>
          {redirectToDashboard()}
        </>
      )}
      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal">
            <div className="modal-content p-6 bg-white rounded-lg shadow-lg">
              <span
                className="close absolute top-2 right-2 text-gray-500 cursor-pointer"
                onClick={closeLoginModal}
              >
                &times;
              </span>
              <Login onClose={closeLoginModal} />
            </div>
          </div>
        </div>
      )}

      {/* Register Modal */}
      {showRegisterModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal">
            <div className="modal-content p-6 bg-white rounded-lg shadow-lg">
              <span
                className="close absolute top-2 right-2 text-gray-500 cursor-pointer"
                onClick={closeRegisterModal}
              >
                &times;
              </span>
              <Register onClose={closeRegisterModal} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
