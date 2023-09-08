import React, { useState } from 'react';

function AddFriend() {
  const [recipientUserId, setRecipientUserId] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset error message
    setError(null);

    // Perform validation on recipientUserId
    if (!recipientUserId) {
      setError('Recipient user ID is required');
      return;
    }

    // Send a friend request to the backend
    fetch(`${process.env.REACT_APP_API_URL}/api/friends/send_request`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
      body: JSON.stringify({
        recipient_user_id: recipientUserId,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // Display a success message or perform any other action
        // For example, you can redirect to the Friend Request List
        // or update the UI to indicate success.
        console.log('Friend request sent:', data);
      })
      .catch((error) => {
        console.error('Error sending friend request:', error);
        setError('Error sending friend request');
      });
  };

  return (
    <div>
      <h2>Add Friend</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="recipientUserId">Recipient User ID:</label>
          <input
            type="text"
            id="recipientUserId"
            value={recipientUserId}
            onChange={(e) => setRecipientUserId(e.target.value)}
          />
        </div>
        {error && <div>Error: {error}</div>}
        <button type="submit">Send Friend Request</button>
      </form>
    </div>
  );
}

export default AddFriend;
