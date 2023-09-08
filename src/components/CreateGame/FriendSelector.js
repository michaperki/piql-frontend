import React, { useEffect, useState } from 'react';

function FriendSelector({ selectedFriends, onFriendsSelected }) {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch the list of friends from your backend API
    const accessToken = localStorage.getItem('access_token');
    fetch(`${process.env.REACT_APP_API_URL}/api/friends`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setFriends(data);
      })
      .catch((error) => console.error('Error fetching friend data:', error));
  }, []);

  const handleFriendSelection = (event) => {
    const selectedFriendId = parseInt(event.target.value);
    const isChecked = event.target.checked;

    if (isChecked) {
      // Add the selected friend to the list of selected friends
      onFriendsSelected([...selectedFriends, selectedFriendId]);
    } else {
      // Remove the unselected friend from the list of selected friends
      onFriendsSelected(selectedFriends.filter((friendId) => friendId !== selectedFriendId));
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold">Select Friends:</h2>
      <div>
        {friends.map((friend) => (
          <label key={friend.id} className="block">
            <input
              type="checkbox"
              value={friend.id}
              checked={selectedFriends.includes(friend.id)}
              onChange={handleFriendSelection}
            />
            {friend.username}
          </label>
        ))}
      </div>
      {loading ? (
        <div className="mt-4">Loading...</div>
      ) : null}
    </div>
  );
}

export default FriendSelector;
