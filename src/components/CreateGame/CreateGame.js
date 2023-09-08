import React, { useState } from 'react';

function CreateGame() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createGame = async () => {
    try {
      setLoading(true);

      const accessToken = 'YOUR_ACCESS_TOKEN'; // Replace with your actual access token
      const apiUrl = 'https://piql-aec8f86e81c3.herokuapp.com/api/games';

      const requestData = {
        date: '2023-09-10',
        start_time: '14:30:00',
        end_time: '16:30:00',
        court_id: 1,
        players: [6],
      };

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        // Game created successfully
        // You can handle the success case here (e.g., show a success message)
      } else {
        // Handle error cases
        setError('Failed to create the game');
      }
    } catch (error) {
      setError('An error occurred while creating the game');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={createGame} disabled={loading}>
        {loading ? 'Creating Game...' : 'Create Game'}
      </button>
      {error && <p>Error: {error}</p>}
    </div>
  );
}

export default CreateGame;
