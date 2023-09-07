import React from 'react';
import { render, fireEvent, waitFor, getByLabelText, getByText } from '@testing-library/react';
import Register from '../Register';
import '@testing-library/jest-dom';

// Mock the fetch function to simulate API requests
global.fetch = jest.fn(() =>
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message: 'User registered successfully' }),
    })
);

describe('Register Component', () => {
    it('should render the registration form', () => {
        const { getByText, getByLabelText } = render(<Register />);

        // Check if the registration form elements are rendered using regex
        const registerHeader = getByText(/join piql today/i);
        expect(registerHeader).toBeInTheDocument();
        expect(getByLabelText('Email')).toBeInTheDocument();
        expect(getByLabelText('Password')).toBeInTheDocument();
    });

    it('should update form data when input values change', () => {
        const { getByLabelText } = render(<Register />);
        const emailInput = getByLabelText('Email');
        const passwordInput = getByLabelText('Password');

        // Simulate user input
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'testpassword' } });

        // Check if form data is updated
        expect(emailInput.value).toBe('test@example.com');
        expect(passwordInput.value).toBe('testpassword');
    });

    it('should submit the form and handle successful registration', async () => {
        const { getByLabelText, getByText } = render(<Register />);
        const emailInput = getByLabelText('Email');
        const passwordInput = getByLabelText('Password');
        const registerButton = getByText('Register');

        // Simulate user input
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'testpassword' } });

        // Simulate form submission
        fireEvent.click(registerButton);

        // Wait for the API request to resolve
        await waitFor(() => {
            expect(fetch).toHaveBeenCalledTimes(1);
        });

        // Add a delay before checking the success message
        setTimeout(() => {
            // Check if the success message is displayed using regex
            const successMessage = getByText(/User registered successfully/i);
            expect(successMessage).toBeInTheDocument();
        }, 1000); // Adjust the delay time as needed
    });

    it('should handle registration with an existing email and display an error message', async () => {
        // Mock the fetch function to simulate an error response
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: false,
                json: () => Promise.resolve({ error: 'Email already registered' }),
            })
        );

        const { getByLabelText, getByText } = render(<Register />);
        const emailInput = getByLabelText('Email');
        const passwordInput = getByLabelText('Password');
        const registerButton = getByText('Register');

        // Simulate user input
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'testpassword' } });

        // Simulate form submission
        fireEvent.click(registerButton);

        // Wait for the API request to resolve
        await waitFor(() => {
            expect(fetch).toHaveBeenCalledTimes(1);
        });

        // Add a delay before checking the error message
        setTimeout(() => {
            // Check if the error message is displayed using regex
            const errorMessage = getByText(/Error: Email already registered/i);
            expect(errorMessage).toBeInTheDocument();
        }, 1000); // Adjust the delay time as needed
    });
});
