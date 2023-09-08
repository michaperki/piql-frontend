import React, { useState } from 'react';
import CourtSelector from '../CourtSelector';

function CreateGame() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCourt, setSelectedCourt] = useState(null);
  const accessToken = localStorage.getItem('access_token');

  const [formData, setFormData] = useState({
    date: '',
    startTime: '',
    endTime: '',
    courtId: 1,
    players: [6],
  });

  const handleCourtSelected = (court) => {
    setSelectedCourt(court);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Format the time values to 'HH:mm:ss'
    const formattedStartTime = `${formData.startTime}:00`;
    const formattedEndTime = `${formData.endTime}:00`;

    const requestData = {
      date: formData.date,
      start_time: formattedStartTime,
      end_time: formattedEndTime,
      court_id: formData.courtId,
      players: formData.players,
    };

    try {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/games`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        // Game created successfully
        // You can handle the success case here (e.g., show a success message)
        console.log('Game created successfully');
      } else {
        // Handle error cases
        setError('Failed to create the game');
      }
    } catch (error) {
      setError('An error occurred while creating the game');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="date" className="block text-lg font-semibold mb-2">
            Date:
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            required
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="startTime" className="block text-lg font-semibold mb-2">
            Start Time:
          </label>
          <input
            type="time"
            id="startTime"
            name="startTime"
            value={formData.startTime}
            onChange={handleInputChange}
            required
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="endTime" className="block text-lg font-semibold mb-2">
            End Time:
          </label>
          <input
            type="time"
            id="endTime"
            name="endTime"
            value={formData.endTime}
            onChange={handleInputChange}
            required
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="courtSelect" className="block text-lg font-semibold mb-2">
            Select a Court:
          </label>
          <CourtSelector onCourtSelected={handleCourtSelected} />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md transition-opacity hover:opacity-80"
        >
          {loading ? 'Creating Game...' : 'Create Game'}
        </button>
      </form>
      {error && <p className="text-red-500 mt-4">Error: {error}</p>}
    </div>
  );
}

export default CreateGame;
