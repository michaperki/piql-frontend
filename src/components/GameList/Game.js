import React, { useState } from 'react';
import datetimeUtils from '../../utils/datetimeUtils'; // Import the datetimeUtils module

function Game({ game, onJoinClick }) {
  const [showDetails, setShowDetails] = useState(false);
  const formattedStartTime = datetimeUtils.formatTime(game.start_time);
  const formattedDate = datetimeUtils.formatDate(game.date);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div
      onClick={toggleDetails}
      className="bg-white rounded-lg shadow-md p-4 my-4 cursor-pointer"
    >
      <div className="flex items-center justify-between">
        <p className="ml-2">
          {game.court_name}, {formattedDate}, {formattedStartTime}
        </p>
        <button
          onClick={() => onJoinClick(game.id)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md transition duration-300 ease-in-out"
        >
          Join
        </button>
      </div>
      {showDetails && (
        <div>
          <p className="font-semibold">Players:</p>
          <p>{game.usernames.length > 1 ? game.usernames.join(', ') : game.usernames[0]}</p>
          {/* Add any other additional details here */}
        </div>
      )}
    </div>
  );
}

export default Game;
