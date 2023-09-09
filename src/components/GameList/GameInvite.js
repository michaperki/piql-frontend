import React from "react";

function GameInvite({ gameInvite }) {
  const { id, senderName, message } = gameInvite;

  // Handle accepting the game invite
  const handleAcceptClick = () => {
    // Implement your logic for accepting the game invite here
    // For example, you can send a request to the server to accept the invite
    // and then update the UI accordingly
    console.log(`Accepted game invite with ID ${id}`);
  };

  // Handle rejecting the game invite
  const handleRejectClick = () => {
    // Implement your logic for rejecting the game invite here
    // For example, you can send a request to the server to reject the invite
    // and then update the UI accordingly
    console.log(`Rejected game invite with ID ${id}`);
  };

  return (
    <div className="game-invite">
      <h3>Game Invite</h3>
      <p>Sender: {senderName}</p>
      <p>Message: {message}</p>
      <button onClick={handleAcceptClick}>Accept</button>
      <button onClick={handleRejectClick}>Reject</button>
    </div>
  );
}

export default GameInvite;
