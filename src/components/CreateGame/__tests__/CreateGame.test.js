import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CreateGame from '../CreateGame';

// Mock the fetch function
global.fetch = jest.fn();

describe('CreateGame', () => {
  it('should render the form fields', () => {
    render(<CreateGame />);
    
    const dateInput = screen.getByLabelText('Date:');
    const startTimeInput = screen.getByLabelText('Start Time:');
    const endTimeInput = screen.getByLabelText('End Time:');
    const courtSelector = screen.getByTestId('court-selector');
    const createGameButton = screen.getByText('Create Game');
    
    expect(dateInput).toBeInTheDocument();
    expect(startTimeInput).toBeInTheDocument();
    expect(endTimeInput).toBeInTheDocument();
    expect(courtSelector).toBeInTheDocument();
    expect(createGameButton).toBeInTheDocument();
  });

  it('should display loading state when submitting the form', async () => {
    render(<CreateGame />);
    
    const createGameButton = screen.getByText('Create Game');
    
    fireEvent.click(createGameButton);
    
    const loadingText = screen.getByText('Creating Game...');
    
    expect(loadingText).toBeInTheDocument();
  });

  it('should submit the form with the correct data', async () => {
    render(<CreateGame />);
    
    const dateInput = screen.getByLabelText('Date:');
    const startTimeInput = screen.getByLabelText('Start Time:');
    const endTimeInput = screen.getByLabelText('End Time:');
    const createGameButton = screen.getByText('Create Game');
    
    fireEvent.change(dateInput, { target: { value: '2023-09-10' } });
    fireEvent.change(startTimeInput, { target: { value: '14:30' } });
    fireEvent.change(endTimeInput, { target: { value: '16:30' } });
    
    fireEvent.click(createGameButton);

    // Wait for fetch to be called and resolve
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(expect.any(String), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: expect.any(String), // You can use a matcher like this if you can't predict the exact token
        },
        body: JSON.stringify({
          date: '2023-09-10',
          start_time: '14:30:00',
          end_time: '16:30:00',
          court_id: 1, // Assuming courtId remains 1
          players: [6], // Assuming players remain [6]
        }),
      });
    });
  });

  // You can add more test cases for error handling and validation as needed
});
