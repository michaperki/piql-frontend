import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import GameList from '../GameList';
import '@testing-library/jest-dom/extend-expect'; // Import jest-dom to extend expect function

// Mock the fetch function to return a sample game list
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        {
          id: 1,
          date: '2023-09-10',
          start_time: '14:30:00',
          end_time: '16:30:00',
          court_id: 1,
          player_ids: [6],
        },
        // Add more sample game data as needed
      ]),
    ok: true,
  })
);

describe('GameList', () => {
  it('should render loading message initially', async () => {
    render(<GameList />);
    const loadingText = screen.getByText('Loading...');
    expect(loadingText).toBeInTheDocument();
  });

  it('should render game data after fetching', async () => {
    render(<GameList />);
    await waitFor(() => {
      const dateText = screen.getByText('Date: 2023-09-10');
      const startTimeText = screen.getByText('Start Time: 14:30:00');
      const endTimeText = screen.getByText('End Time: 16:30:00');
      const courtIdText = screen.getByText('Court ID: 1');
      const playersText = screen.getByText('Players: 6');
      
      expect(dateText).toBeInTheDocument();
      expect(startTimeText).toBeInTheDocument();
      expect(endTimeText).toBeInTheDocument();
      expect(courtIdText).toBeInTheDocument();
      expect(playersText).toBeInTheDocument();
    });
  });
});
