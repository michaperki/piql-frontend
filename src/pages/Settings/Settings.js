import React, { useState, useEffect } from 'react';

const Settings = () => {
  const [username, setUsername] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const accessToken = localStorage.getItem('access_token');

  // Function to toggle editing mode
  const toggleEdit = () => {
    setIsEditing(!isEditing);
    // Reset newUsername when exiting editing mode
    if (!isEditing) {
      setNewUsername('');
    }
  };

  // Function to update the username
  const updateUsername = () => {
    // Make a PUT request to update the username
    fetch(`${process.env.REACT_APP_API_URL}/api/settings/update_username`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ new_username: newUsername }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update username');
        }
        return response.json();
      })
      .then((data) => {
        setUsername(data.username);
        toggleEdit();
      })
      .catch((error) => {
        console.error('Error updating username:', error);
      });
  };

  // Fetch the user's current username
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/settings/get_username`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch username');
        }
        return response.json();
      })
      .then((data) => {
        setUsername(data.username);
      })
      .catch((error) => {
        console.error('Error fetching username:', error);
      });
  }, [accessToken]);

  return (
    <div>
      <h1>Settings</h1>
      <p>Username: {username}</p>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
          />
          <button onClick={updateUsername}>Save</button>
          <button onClick={toggleEdit}>Cancel</button>
        </div>
      ) : (
        <button onClick={toggleEdit}>Edit Username</button>
      )}
    </div>
  );
};

export default Settings;
