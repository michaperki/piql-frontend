import React, { useState } from 'react';

// Star rating component
const StarRating = ({ value, onChange }) => {
  const maxStars = 5;
  const stars = Array.from({ length: maxStars }, (_, index) => {
    const starValue = index + 0.5; // Half-star increments
    return (
      <span
        key={starValue}
        className={`cursor-pointer ${
          starValue <= value ? 'text-yellow-400' : 'text-gray-300'
        }`}
        onClick={() => onChange(starValue)}
      >
        ★
      </span>
    );
  });

  return <div className="flex space-x-1">{stars}</div>;
};

export default StarRating;