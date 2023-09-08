import React, { useState, useEffect } from 'react';

function GameList() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const accessToken = localStorage.getItem('access_token');

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/games`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Data received from API:', data); // Add this line
        setGames(data);
        setLoading(false); // Turn off loading
      })
      .catch((error) => {
        console.error('Error fetching games data:', error);
        setError(error.message);
        setLoading(false); // Turn off loading
      });
  }, []);
  

  if (!games) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Game List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : games.length === 0 ? (
        <p>No games available</p>
      ) : (
        <ul>
          {games.map((game) => (
            <li key={game.id}>
              <p>Date: {game.date}</p>
              <p>Start Time: {game.start_time}</p>
              <p>End Time: {game.end_time}</p>
              <p>Court ID: {game.court_id}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default GameList;
