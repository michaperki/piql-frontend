import React from 'react';
import { render } from '@testing-library/react';
import Social from '../Social';
import "../../../setupTests"

describe('Social Component', () => {
    it('should render the Settings', () => {
        render(<Social />);
        // Add any assertions or expectations here if needed
    });
});