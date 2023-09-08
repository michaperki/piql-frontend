import React, { useState, useEffect } from 'react';

function GameList() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const accessToken = localStorage.getItem('access_token');

  useEffect(() => {
    // Create headers object with the Authorization header
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    fetch(`${process.env.REACT_APP_API_URL}/api/games`, { headers })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Data received from API:', data);
        setGames(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching games data:', error);
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
      <h2>Game List</h2>
      {games.length === 0 ? (
        <p>No games available</p>
      ) : (
        <ul>
          {games.map((game) => (
            <li key={game.id}>
              <p>Date: {game.date}</p>
              <p>Start Time: {game.start_time}</p>
              <p>End Time: {game.end_time}</p>
              <p>Court ID: {game.court_id}</p>
              <p>
                Players: {game.player_ids.length > 1 ? game.player_ids.join(', ') : game.player_ids[0]}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default GameList;
