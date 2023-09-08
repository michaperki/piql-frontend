import React, { useEffect, useState } from 'react';

function Court({ courtData }) {  
  if (!courtData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-2">{courtData.name}</h2>
      <p className="text-sm text-gray-600">Address: {courtData.address}</p>
      <p className="text-sm text-gray-600">Number of Courts: {courtData.number_of_courts}</p>
      <p className="text-sm text-gray-600">Is Public: {courtData.is_public ? 'Yes' : 'No'}</p>
      <img
        src={`${process.env.REACT_APP_API_URL}/images/${courtData.image_url}`}
        alt="Court"
        className="mt-2 rounded-lg"
      />
    </div>
  );
}

export default Court;
