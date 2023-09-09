import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StarRating from './StarRating';

function Onboarding() {
  const navigate = useNavigate();

  // State variables to manage user input and error message
  const [formData, setFormData] = useState({
    username: '',
    skill_level: 0,
  });
  const [message, setMessage] = useState('');

  // Event handler to update form data as the user types
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Event handler to update skill level
  const handleSkillLevelChange = (value) => {
    setFormData({
      ...formData,
      skill_level: value,
    });
  };

  // Event handler to submit form data to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/settings/complete-onboarding`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Onboarding successful, you can perform actions here (e.g., redirect)
        navigate('/dashboard');
      } else {
        // Handle error here, display error message from the server response
        const errorData = await response.json();
        setMessage('Error: ' + (errorData.error || 'Error onboarding'));
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="onboarding-form min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">Welcome to Piql</h2>
          {message && <p className="text-red-600 text-center">{message}</p>}
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            {/* Username input */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text" 
                autoComplete="username"
                required 
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            {/* Skill level input */}
            <div>
              <label htmlFor="skill_level" className="block text-sm font-medium text-gray-700">
                Skill Level
              </label>
              <StarRating
                value={formData.skill_level}
                onChange={handleSkillLevelChange}
              />
            </div>
          </div>
          {/* Submit button */}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Onboarding;
