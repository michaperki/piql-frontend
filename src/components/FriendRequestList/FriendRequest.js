import React from 'react';

function FriendRequest({ request, onAccept }) {
  return (
    <li key={request.id}>
      <p>ID: {request.id}</p>
      <p>Sender ID: {request.sender_id}</p>
      <p>Status: {request.status}</p>
      <button onClick={() => onAccept(request.id)}>Accept</button>
    </li>
  );
}

export default FriendRequest;
