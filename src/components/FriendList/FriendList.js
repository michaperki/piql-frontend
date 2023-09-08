import React, { useState, useEffect } from 'react';

function FriendList() {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const accessToken = localStorage.getItem('access_token');

  useEffect(() => {
    // Create headers object with the Authorization header
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    // Fetch friends data from the backend
    fetch(`${process.env.REACT_APP_API_URL}/api/friends`, { headers })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Data received from API:', data);
        setFriends(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching friends data:', error);
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
      <h2>Friend List</h2>
      {friends.length === 0 ? (
        <p>No friends available</p>
      ) : (
        <ul>
          {friends.map((friend) => (
            <li key={friend.id}>
              <p>ID: {friend.id}</p>
              <p>Username: {friend.username}</p>
              {/* Add additional friend information here */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FriendList;
