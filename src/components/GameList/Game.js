import React from 'react';

function Game({ game, onJoinClick }) {
  return (
    <div>
      <h2>Game Details</h2>
      <p>Date: {game.date}</p>
      <p>Start Time: {game.start_time}</p>
      <p>End Time: {game.end_time}</p>
      <p>Court ID: {game.court_id}</p>
      <p>
        Players: {game.player_ids.length > 1 ? game.player_ids.join(', ') : game.player_ids[0]}
      </p>
      <button onClick={() => onJoinClick(game.id)}>Join</button>
    </div>
  );
}

export default Game;
