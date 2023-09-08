import React, { useEffect, useState } from 'react';
import Court from '../Court';

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
    <div>
      <label htmlFor="courtSelect">Select a Court:</label>
      <select
        id="courtSelect"
        onChange={handleCourtSelection}
        value={selectedCourtId || ''}
      >
        <option value="">Select a court</option>
        {courts.map((court) => (
          <option key={court.id} value={court.id}>
            {court.name}
          </option>
        ))}
      </select>
      {loading ? (
        <div>Loading...</div>
      ) : (
        selectedCourt && (
          <div>
            <h2>Selected Court</h2>
            <Court courtData={selectedCourt} />
          </div>
        )
      )}
    </div>
  );
}

export default CourtSelector;
