import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import CreateGame from '../../components/CreateGame';
import '@fortawesome/fontawesome-svg-core/styles.css';

const Dashboard = () => {
  const [isCreateGameOpen, setCreateGameOpen] = useState(false);

  const toggleCreateGame = () => {
    setCreateGameOpen(!isCreateGameOpen);
  };

  return (
    <div>
      {/* Button to open/close the CreateGame form */}
      <button
        className="fixed bottom-8 right-8 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none"
        onClick={toggleCreateGame}
      >
        {isCreateGameOpen ? '-' : '+'}
      </button>

      {/* Conditional rendering of CreateGame component */}
      {isCreateGameOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-70 overflow-auto">
          <div className="bg-white p-4 rounded-lg shadow-lg relative">
            <CreateGame />
            <button
              className="absolute top-4 right-4 bg-red-500 text-white p-2 px-4 rounded-md hover:bg-red-600"
              onClick={toggleCreateGame}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
 