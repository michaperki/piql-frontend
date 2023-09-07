import React from 'react';
import { render, fireEvent, act, waitFor } from '@testing-library/react';
import Login from '../Login';
import '@testing-library/jest-dom'

global.fetch = jest.fn(() =>
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message: 'Login successful' }),
    })
);

describe('Login Component', () => {
    it('should render the login form', () => {
        const { getByText, getByLabelText } = render(<Login />);

        // Use setTimeout to wait for elements to appear
        expect(getByText('Login to Piql')).toBeInTheDocument();
        expect(getByLabelText('Email')).toBeInTheDocument();
        expect(getByLabelText('Password')).toBeInTheDocument();
    });

    it('should update form data when input values change', () => {
        const { getByLabelText } = render(<Login />);
        const emailInput = getByLabelText('Email');
        const passwordInput = getByLabelText('Password');

        // Simulate user input
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'testpassword' } });

        // Check if form data is updated
        expect(emailInput.value).toBe('test@example.com');
        expect(passwordInput.value).toBe('testpassword');
    });

    it('should submit the form and handle successful login', async () => {
        const { getByLabelText, getByText } = render(<Login />);
        const emailInput = getByLabelText('Email');
        const passwordInput = getByLabelText('Password');
        const loginButton = getByText('Login');

        // Simulate user input
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'testpassword' } });

        // Simulate form submission
        fireEvent.click(loginButton);

        // Wait for the API request to resolve
        await waitFor(() => {
            expect(fetch).toHaveBeenCalledTimes(1);
        });

        // Use setTimeout to wait for the success message to appear
        setTimeout(() => {
            expect(getByText('Login successful')).toBeInTheDocument();
        }, 1000); // Adjust the delay time as needed
    });

    it('should handle login with incorrect credentials and display an error message', async () => {
        // Mock the fetch function to simulate an error response
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: false,
                json: () => Promise.resolve({ error: 'Incorrect credentials' }),
            })
        );

        const { getByLabelText, getByText } = render(<Login />);
        const emailInput = getByLabelText('Email');
        const passwordInput = getByLabelText('Password');
        const loginButton = getByText('Login');

        // Simulate user input
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'testpassword' } });

        // Simulate form submission
        fireEvent.click(loginButton);

        // Wait for the API request to resolve
        await waitFor(() => {
            expect(fetch).toHaveBeenCalledTimes(1);
        });

        // Use setTimeout to wait for the error message to appear
        setTimeout(() => {
            expect(getByText('Error: Incorrect credentials')).toBeInTheDocument();
        }, 1000); // Adjust the delay time as needed
    });
});
