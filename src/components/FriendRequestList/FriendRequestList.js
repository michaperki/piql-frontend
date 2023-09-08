import React, { useState, useEffect } from 'react';
import AddFriend from './AddFriend';

function FriendRequestList() {
  const [friendRequests, setFriendRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const accessToken = localStorage.getItem('access_token');

  useEffect(() => {
    // Create headers object with the Authorization header
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    // Fetch friend requests data from the backend
    fetch(`${process.env.REACT_APP_API_URL}/api/friends/requests`, { headers })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Data received from API:', data);
        setFriendRequests(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching friend requests data:', error);
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
      <h2>Friend Request List</h2>
      {friendRequests.length === 0 ? (
        <p>No friend requests available</p>
      ) : (
        <ul>
          {friendRequests.map((request) => (
            <li key={request.id}>
              <p>ID: {request.id}</p>
              <p>Sender ID: {request.sender_id}</p>
              <p>Status: {request.status}</p>
              {/* Add additional friend request information here */}
            </li>
          ))}
        </ul>
      )}
      <AddFriend />
    </div>
  );
}

export default FriendRequestList;
