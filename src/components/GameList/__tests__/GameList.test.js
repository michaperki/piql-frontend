import React from 'react';
import { render, screen } from '@testing-library/react';
import GameList from '../GameList'; // Adjust the import path as needed
import '@testing-library/jest-dom'

test('renders the CreateGame', () => {
  render(<GameList />);
  const text = screen.getAllByText('Game List'); // Use getAllByText to handle multiple matches
  expect(text.length).toBeGreaterThan(0); // Check that at least one element with text "Add Item" is found
});
