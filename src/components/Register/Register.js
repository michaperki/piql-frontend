import React, { useState } from 'react';

function Register() {
  // State variables to manage user input and success message
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  // Event handler to update form data as user types
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
      const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        // Registration successful, display success message
        setMessage('User registered successfully');
        // Clear the form
        setFormData({
          email: '',
          password: '',
        });
      } else {
        // Handle error here, display error message from the server response
        const errorData = await response.json();
        setMessage("Error: " + errorData.error || 'Error registering user');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="register-form">
      <h2>Join Piql today</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
