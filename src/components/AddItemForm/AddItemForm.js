import React, { useState } from 'react';

function AddItemForm() {
  const [formData, setFormData] = useState({
    name: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/add_item`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Item added successfully, update UI as needed
        console.log('Item added successfully');
      } else {
        // Handle error here, display error message, etc.
        console.error('Error adding item');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Add Item</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        {/* Add fields for description, price, etc. */}
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
}

export default AddItemForm;
