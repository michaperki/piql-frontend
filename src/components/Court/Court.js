import React, { useEffect, useState } from 'react';

function Court({ courtData }) {  
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
