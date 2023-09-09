import React, { useState, useEffect } from "react";
import GameInvite from "./GameInvite"; // Assuming you have a "GameInvite" component for displaying game invites

function GameInviteList() {
  const [gameInvites, setGameInvites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const accessToken = localStorage.getItem("access_token");

  useEffect(() => {
    // Create headers object with the Authorization header
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    // Fetch game invites data (modify the API endpoint as needed)
    fetch(`${process.env.REACT_APP_API_URL}/api/game-invites`, { headers })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data received from API:", data);
        setGameInvites(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching game invites data:", error);
        setError(error.message);
        setLoading(false);
      });
  }, [accessToken]); // Include accessToken in the dependency array to re-fetch data when it changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Game Invites</h2>
      {gameInvites.length === 0 ? (
        <p>No game invites available</p>
      ) : (
        <ul>
          {gameInvites.map((gameInvite) => (
            <li key={gameInvite.id}>
              <GameInvite gameInvite={gameInvite} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default GameInviteList;
