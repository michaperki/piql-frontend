import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    
    // State variables to manage user input and error message
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
            const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                // Login successful, you can perform actions here (e.g., redirect)
                const data = await response.json();
                const accessToken = data.access_token; // Assuming the token is in the response
                // Store the access token in local storage for future use
                localStorage.setItem('access_token', accessToken);
                navigate('/dashboard')                
            } else {
                // Handle error here, display error message from the server response
                const errorData = await response.json();
                setMessage("Error: " + errorData.error || 'Error logging in');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="login-form">
            <h2>Login to Piql</h2>
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
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
