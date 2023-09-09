import React from "react";

function GameInvite({ gameInvite }) {
  const { id, court_id, date, start_time, end_time } = gameInvite;

  const handleAcceptClick = () => {
    const accessToken = localStorage.getItem("access_token");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    };

    // Send a POST request to accept the game invite
    fetch(`${process.env.REACT_APP_API_URL}/api/game-invites/accept/${id}`, {
      method: "POST",
      headers,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to accept the game invite");
        }
        // Handle the success response as needed
        console.log("Accepted the game invite successfully");
        // You can also update the UI here to indicate that the invite is accepted
      })
      .catch((error) => {
        // Handle errors from the POST request
        console.error("Error accepting the game invite:", error);
        // Display an error message or take appropriate action
      });
  };

  const handleRejectClick = () => {
    const accessToken = localStorage.getItem("access_token");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    };
  
    // Send a POST request to reject the game invite
    fetch(`${process.env.REACT_APP_API_URL}/api/game-invites/reject/${id}`, {
      method: "POST",
      headers,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to reject the game invite");
        }
        // Handle the success response as needed
        console.log("Rejected the game invite successfully");
        // You can also update the UI here to indicate that the invite is rejected
      })
      .catch((error) => {
        // Handle errors from the POST request
        console.error("Error rejecting the game invite:", error);
        // Display an error message or take appropriate action
      });
  };
  

  return (
    <div className="game-invite">
      <h3>Game Invite</h3>
      <p>Court ID: {court_id}</p>
      <p>Date: {date}</p>
      <p>Start Time: {start_time}</p>
      <p>End Time: {end_time}</p>
      <button onClick={handleAcceptClick}>Accept</button>
      <button onClick={handleRejectClick}>Reject</button>
    </div>
  );
}

export default GameInvite;
