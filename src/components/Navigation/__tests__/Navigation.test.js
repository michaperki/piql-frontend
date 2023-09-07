import React from 'react';
import { render } from '@testing-library/react';
import Navigation from '../Navigation';
import "../../../setupTests"

describe('Navigate Component', () => {
    it('should render the navigation component', () => {
        render(<Navigation />);
        // Add any assertions or expectations here if needed
    });
});