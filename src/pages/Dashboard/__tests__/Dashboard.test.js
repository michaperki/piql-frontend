import React from 'react';
import { render } from '@testing-library/react';
import Dashboard from '../Dashboard';
import "../../../setupTests"

describe('Dashboard Component', () => {
    it('should render the dashboard', () => {
        render(<Dashboard />);
        // Add any assertions or expectations here if needed
    });
});