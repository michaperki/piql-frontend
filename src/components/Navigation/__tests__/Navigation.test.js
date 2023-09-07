import React from 'react';
import { render } from '@testing-library/react';
import Navigation from '../Navigation'; // Import your Navigation component
import '@testing-library/jest-dom/extend-expect'; // Import jest-dom to extend expect function
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter

describe('Navigation Component', () => {
  it('renders navigation links correctly', () => {
    const { getByText, getByLabelText } = render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );

    // Test that the navigation links are present and have the correct text
    const dashboardLink = getByText('Dashboard');
    const calendarLink = getByText('Calendar');
    const gamesLink = getByText('Games');
    const settingsLink = getByText('Settings');

    expect(dashboardLink).toBeInTheDocument();
    expect(calendarLink).toBeInTheDocument();
    expect(gamesLink).toBeInTheDocument();
    expect(settingsLink).toBeInTheDocument();
  });

  it('links navigate to the correct paths', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );

    // Test that the navigation links have the correct href attributes
    const dashboardLink = getByText('Dashboard');
    const calendarLink = getByText('Calendar');
    const gamesLink = getByText('Games');
    const settingsLink = getByText('Settings');

    expect(dashboardLink.getAttribute('href')).toBe('/dashboard');
    expect(calendarLink.getAttribute('href')).toBe('/calendar');
    expect(gamesLink.getAttribute('href')).toBe('/games');
    expect(settingsLink.getAttribute('href')).toBe('/settings');
  });
});
