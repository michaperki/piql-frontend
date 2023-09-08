import React, { useEffect, useState } from 'react';
import Court from '../../Court';

function CourtSelector({ onCourtSelected }) {
  const [courts, setCourts] = useState([]);
  const [selectedCourtId, setSelectedCourtId] = useState(null);
  const [selectedCourt, setSelectedCourt] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch the list of courts from your backend API
    const accessToken = localStorage.getItem('access_token');
    fetch(`${process.env.REACT_APP_API_URL}/api/courts`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCourts(data);
      })
      .catch((error) => console.error('Error fetching court data:', error));
  }, []);

  const handleDetailsClick = (courtId) => {
    // You can use the courtId to fetch additional details if needed
    // For simplicity, let's just show an alert with the court's ID for now
    alert(`Court Details Clicked for Court ID: ${courtId}`);
  };

  const handleCourtSelection = (event) => {
    const selectedCourtId = parseInt(event.target.value);
    setSelectedCourtId(selectedCourtId);
    setLoading(true);

    // Fetch the specific court data based on the selectedCourtId
    fetch(`${process.env.REACT_APP_API_URL}/api/courts/${selectedCourtId}`)
      .then((response) => response.json())
      .then((data) => {
        setSelectedCourt(data);
        setLoading(false);
        onCourtSelected(data);
      })
      .catch((error) => {
        console.error('Error fetching court data:', error);
        setLoading(false);
      });
  };

  return (
    <div className="p-4">
      <select
        id="courtSelect"
        onChange={handleCourtSelection}
        value={selectedCourtId || ''}
        className="w-full p-2 border rounded-md"
      >
        <option value="">Select a court</option>
        {courts.map((court) => (
          <option key={court.id} value={court.id}>
            {court.name}
          </option>
        ))}
      </select>
      {loading ? (
        <div className="mt-4">Loading...</div>
      ) : (
        selectedCourt && (
          <div className="mt-4">
            <h2 className="text-xl font-semibold">Selected Court: {selectedCourt.name}</h2>
            <button
              className="text-blue-500 hover:text-blue-700 cursor-pointer"
              onClick={() => handleDetailsClick(selectedCourt.id)}
            >
              View Details
            </button>
          </div>
        )
      )}
    </div>
  );
}

export default CourtSelector;
