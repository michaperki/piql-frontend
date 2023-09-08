import React, { useState } from 'react';

function AddFriend({ onSendFriendRequest }) {
  const [recipient, setRecipient] = useState('');
  const [error, setError] = useState('');

  const handleRecipientChange = (e) => {
    setRecipient(e.target.value);
    setError(''); // Clear any previous errors when the user starts typing.
  };

  const handleSendFriendRequest = () => {
    // Validate the recipient input (e.g., check if it's not empty).
    if (!recipient.trim()) {
      setError('Recipient cannot be empty');
      return;
    }

    // Call the parent component's function to send the friend request.
    onSendFriendRequest(recipient);

    // Clear the input field after sending the request.
    setRecipient('');
  };

  return (
    <div>
      <h2>Add Friend</h2>
      <div>
        <input
          type="text"
          placeholder="Enter username or user ID"
          value={recipient}
          onChange={handleRecipientChange}
        />
        <button onClick={handleSendFriendRequest}>Send Friend Request</button>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default AddFriend;
