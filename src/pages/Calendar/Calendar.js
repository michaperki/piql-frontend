import React, { useEffect, useState } from "react";

function Calendar() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    // Fetch games for the logged-in user
    const accessToken = localStorage.getItem("access_token");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    fetch(`${process.env.REACT_APP_API_URL}/api/games/user`, {
      method: "GET",
      headers,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch games");
        }
        return response.json();
      })
      .then((data) => {
        setGames(data);
      })
      .catch((error) => {
        console.error("Error fetching games:", error);
      });
  }, []);

  // Render your calendar with the fetched games
  return (
    <div className="calendar">
      {/* Render your calendar here */}
      {games.map((game) => (
        <div key={game.id} className="calendar-event">
          <span>{game.date}</span>
          <span>{game.start_time} - {game.end_time}</span>
          <span>Court {game.court_id}</span>
        </div>
      ))}
    </div>
  );
}

export default Calendar;
