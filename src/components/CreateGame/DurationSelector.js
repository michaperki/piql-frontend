import React from 'react';

function DurationSelector({ duration, onChange }) {
  const handleIncrement = () => {
    onChange(true); // Increment duration
  };

  const handleDecrement = () => {
    onChange(false); // Decrement duration
  };

  return (
    <div className="mb-4">
      <label htmlFor="duration" className="block text-lg font-semibold mb-2">
        Game Duration (in minutes):
      </label>
      <div className="flex items-center">
        <button
          type="button"
          className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 focus:outline-none"
          onClick={handleDecrement}
        >
          -
        </button>
        <input
          type="text" // Use a text input to display the duration (non-editable)
          id="duration"
          name="duration"
          value={`${duration} minutes`}
          readOnly
          className="w-full p-2 border rounded-md"
        />
        <button
          type="button"
          className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 focus:outline-none"
          onClick={handleIncrement}
        >
          +
        </button>
      </div>
    </div>
  );
}

export default DurationSelector;
