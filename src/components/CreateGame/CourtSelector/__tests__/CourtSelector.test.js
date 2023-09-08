import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CourtSelector from '../CourtSelector';
import '@testing-library/jest-dom/extend-expect'; // Import jest-dom to extend expect function
import { act } from '@testing-library/react';

// Mock the fetch function to return a sample list of courts
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        { id: 1, name: 'Court A' },
        { id: 2, name: 'Court B' },
        // Add more sample court data as needed
      ]),
    ok: true,
  })
);

describe('CourtSelector', () => {
  it('should render the component', () => {
    render(<CourtSelector />);
    
    const selectElement = screen.getByLabelText('Select a Court:');
    expect(selectElement).toBeInTheDocument();
  });
})
