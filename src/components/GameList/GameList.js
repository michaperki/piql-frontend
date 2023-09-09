import React, { useState, useEffect } from "react";
import Game from "./Game";
import GameInviteList from "./GameInviteList"; // Import the GameInviteList component

function GameList() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showGameList, setShowGameList] = useState(true); // Initial state can be based on your logic
  const accessToken = localStorage.getItem("access_token");

  useEffect(() => {
    // Create headers object with the Authorization header
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    fetch(`${process.env.REACT_APP_API_URL}/api/games`, { headers })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data received from API:", data);
        setGames(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching games data:", error);
        setError(error.message);
        setLoading(false);
      });
  }, [accessToken]); // Include accessToken in the dependency array to re-fetch data when it changes

  const handleJoinClick = (gameId) => {
    // Send a POST request to join the game with the specified gameId
    const accessToken = localStorage.getItem("access_token");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    fetch(`${process.env.REACT_APP_API_URL}/api/games/${gameId}/join`, {
      method: "POST",
      headers,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to join the game");
        }
        // Handle the success response as needed
        // For example, you can display a message to the user
        console.log("Joined the game successfully");
      })
      .catch((error) => {
        // Handle errors from the POST request
        console.error("Error joining the game:", error);
        // Display an error message or take appropriate action
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <button
        onClick={() => setShowGameList(!showGameList)}
        className="mb-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md transition duration-300 ease-in-out"
      >
        {showGameList ? "Show Game Invites" : "Show Game List"}
      </button>
      <h2 className="text-xl mb-2">
        {showGameList ? "Game List" : "Game Invites"}
      </h2>
      {showGameList ? (
        games.length === 0 ? (
          <p>No games available</p>
        ) : (
          <ul>
            {games.map((game) => (
              <li key={game.id}>
                <Game game={game} onJoinClick={handleJoinClick} />
              </li>
            ))}
          </ul>
        )
      ) : (
        <GameInviteList /> // Render the GameInviteList component
      )}
    </div>
  );
}

export default GameList;
