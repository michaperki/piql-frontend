import React from 'react';
import { render } from '@testing-library/react';
import Home from '../Home';
import "../../../setupTests"

describe('Home Component', () => {
    it('should render the dashboard', () => {
        render(<Home />);
        // Add any assertions or expectations here if needed
    });
});