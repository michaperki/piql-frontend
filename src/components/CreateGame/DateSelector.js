import React from 'react';

function DateSelector({ date, startTime, onChange }) {
  const handleIncrement = () => {
    onChange(true); // Increment date
  };

  const handleDecrement = () => {
    onChange(false); // Decrement date
  };

  // Extract month and day from the date string (YYYY-MM-DD)
  const [year, month, day] = date.split('-');
  const formattedDate = `${month}-${day}`;

  return (
    <div className="mb-4 flex items-center">
      <div className="w-1/2 pr-2">
        <label htmlFor="date" className="block text-lg font-semibold mb-2">
          Date:
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
            type="text"
            id="date"
            name="date"
            value={formattedDate}
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
      <div className="w-1/2 pl-2">
        <label htmlFor="startTime" className="block text-lg font-semibold mb-2">
          Start Time:
        </label>
        <input
          type="time"
          id="startTime"
          name="startTime"
          value={startTime}
          onChange={(e) => onChange(e.target.value)}
          required
          className="w-full p-2 border rounded-md"
        />
      </div>
    </div>
  );
}

export default DateSelector;
