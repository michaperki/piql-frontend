import React, { useState, useEffect } from 'react';
import AddFriend from './AddFriend';
import FriendRequest from './FriendRequest'; // Import the FriendRequest component

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
  }, [accessToken]);

  const handleAcceptRequest = (requestId) => {
    // Send a request to the backend to accept the friend request
    fetch(`${process.env.REACT_APP_API_URL}/api/friends/accept_request/${requestId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // Remove the accepted friend request from the list
        setFriendRequests((prevRequests) =>
          prevRequests.filter((request) => request.id !== requestId)
        );
      })
      .catch((error) => {
        console.error('Error accepting friend request:', error);
        // Handle the error as needed
      });
  };

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
            <FriendRequest
              key={request.id}
              request={request}
              onAccept={handleAcceptRequest}
            />
          ))}
        </ul>
      )}
      <AddFriend />
    </div>
  );
}

export default FriendRequestList;
