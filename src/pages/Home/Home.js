import React, { useState } from 'react';
import Register from '../../components/Register';
import Login from '../../components/Login';

const Home = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

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

  return (
    <div>
      <h1>Welcome to My App</h1>
      <button onClick={openLoginModal}>Login</button>
      <button onClick={openRegisterModal}>Register</button>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeLoginModal}>
              &times;
            </span>
            <Login onClose={closeLoginModal} />
          </div>
        </div>
      )}

      {/* Register Modal */}
      {showRegisterModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeRegisterModal}>
              &times;
            </span>
            <Register onClose={closeRegisterModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
