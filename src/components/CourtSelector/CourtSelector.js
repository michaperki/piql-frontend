import React, { useEffect, useState } from 'react';

function CourtSelector({ onCourtSelected }) {
  const [courts, setCourts] = useState([]);
  const [selectedCourt, setSelectedCourt] = useState(null);

  useEffect(() => {
    // Fetch the list of courts from your backend API
    const accessToken = localStorage.getItem('access_token');
    fetch(`${process.env.REACT_APP_API_URL}/api/courts`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setCourts(data))
      .catch((error) => console.error('Error fetching court data:', error));
  }, []);

  const handleCourtSelection = (event) => {
    const selectedCourtId = parseInt(event.target.value);
    const court = courts.find((c) => c.id === selectedCourtId);
    setSelectedCourt(court);
    onCourtSelected(court); // Pass the selected court to the parent component
  };

  return (
    <div>
      <label htmlFor="courtSelect">Select a Court:</label>
      <select id="courtSelect" onChange={handleCourtSelection} value={selectedCourt ? selectedCourt.id : ''}>
        <option value="">Select a court</option>
        {courts.map((court) => (
          <option key={court.id} value={court.id}>
            {court.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CourtSelector;
