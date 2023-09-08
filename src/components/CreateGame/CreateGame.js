import React, { useState } from "react";
import CourtSelector from "./CourtSelector";
import DurationSelector from "./DurationSelector";
import DateSelector from "./DateSelector";
import FriendSelector from "./FriendSelector";

function CreateGame() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCourt, setSelectedCourt] = useState(null);
  const [selectedFriends, setSelectedFriends] = useState([]); // Store selected friends as an array
  const accessToken = localStorage.getItem("access_token");

  const today = new Date();
  const todayISOString = today.toISOString().slice(0, 10);

  const [formData, setFormData] = useState({
    date: todayISOString,
    startTime: "",
    duration: 30,
    courtId: 1,
    players: [],
  });

  const handleCourtSelected = (court) => {
    setSelectedCourt(court);
  };

  const handleDurationChange = (increment) => {
    const newDuration = formData.duration + (increment ? 30 : -30);
    if (newDuration >= 30) {
      if (formData.startTime) {
        const [hours, minutes] = formData.startTime.split(":");
        const startDateTime = new Date(formData.date);
        startDateTime.setHours(parseInt(hours));
        startDateTime.setMinutes(parseInt(minutes));

        const endDateTime = new Date(
          startDateTime.getTime() + newDuration * 60000
        );
        const formattedEndTime = `${endDateTime.getHours()}:${endDateTime.getMinutes()}`;

        setFormData({
          ...formData,
          duration: newDuration,
          endTime: formattedEndTime, // Update endTime here
        });
      } else {
        // Handle case where startTime is not set
      }
    }
  };

  const handleDateChange = (increment) => {
    const newDate = new Date(formData.date);
    if (increment) {
      newDate.setDate(newDate.getDate() + 1);
    } else {
      newDate.setDate(newDate.getDate() - 1);
    }
    const newDateISOString = newDate.toISOString().slice(0, 10);
    setFormData({
      ...formData,
      date: newDateISOString,
    });
  };

  const handleFriendsSelected = (selectedFriendIds) => {
    setSelectedFriends(selectedFriendIds);

    // Update players based on selectedFriends
    setFormData({
      ...formData,
      players: selectedFriendIds,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if both startTime and endTime are available
    if (formData.startTime && formData.duration) {
      // Parse the startTime and calculate endTime
      const [hours, minutes] = formData.startTime.split(":");
      const startDateTime = new Date(
        `${formData.date}T${formData.startTime}:00`
      );
      const endDateTime = new Date(
        startDateTime.getTime() + formData.duration * 60000
      );

      // Format the time values to 'HH:mm:ss'
      const formattedStartTime = `${hours}:${minutes}:00`;
      const formattedEndTime = `${endDateTime.getHours()}:${endDateTime.getMinutes()}:00`;

      const requestData = {
        date: formData.date,
        start_time: formattedStartTime,
        end_time: formattedEndTime,
        court_id: formData.courtId,
        players: formData.players,
      };

      try {
        setLoading(true);

        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/games`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(requestData),
          }
        );

        if (response.ok) {
          // Game created successfully
          // You can handle the success case here (e.g., show a success message)
          console.log("Game created successfully");
        } else {
          // Handle error cases
          setError("Failed to create the game");
        }
      } catch (error) {
        setError("An error occurred while creating the game");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit}>
        <DateSelector
          date={formData.date}
          startTime={formData.startTime}
          onDateChange={handleDateChange}
          onStartTimeChange={(newStartTime) =>
            setFormData({
              ...formData,
              startTime: newStartTime,
            })
          }
        />
        <DurationSelector
          duration={formData.duration}
          onChange={handleDurationChange}
        />

        <div className="mb-4">
          <label
            htmlFor="friendSelect"
            className="block text-lg font-semibold mb-2"
          >
            Select Friends as Players:
          </label>
          <FriendSelector
            selectedFriends={selectedFriends}
            onFriendsSelected={handleFriendsSelected}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="courtSelect"
            className="block text-lg font-semibold mb-2"
          >
            Select a Court:
          </label>
          <CourtSelector onCourtSelected={handleCourtSelected} />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md transition-opacity hover:opacity-80"
        >
          {loading ? "Creating Game..." : "Create Game"}
        </button>
      </form>
      {error && <p className="text-red-500 mt-4">Error: {error}</p>}
    </div>
  );
}

export default CreateGame;
