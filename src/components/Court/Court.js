import React, { useEffect, useState } from 'react';

function Court() {
  const [courtData, setCourtData] = useState(null);
  const accessToken = localStorage.getItem('access_token');
  
  useEffect(() => {
    // Make a GET request to your API endpoint to retrieve court data
    fetch(`${process.env.REACT_APP_API_URL}/api/courts/1`) // Use template literals
      .then((response) => response.json())
      .then((data) => setCourtData(data))
      .catch((error) => console.error('Error fetching court data:', error));
  }, []);

  if (!courtData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{courtData.name}</h2>
      <p>Address: {courtData.address}</p>
      <p>Number of Courts: {courtData.number_of_courts}</p>
      <p>Is Public: {courtData.is_public ? 'Yes' : 'No'}</p>
      <img src={`${process.env.REACT_APP_API_URL}/images/${courtData.image_url}`} alt="Court" />
    </div>
  );
}

export default Court;
