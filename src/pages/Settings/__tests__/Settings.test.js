import React from 'react';
import { render } from '@testing-library/react';
import Settings from '../Settings';
import "../../../setupTests"

describe('Settings Component', () => {
    it('should render the Settings', () => {
        render(<Settings />);
        // Add any assertions or expectations here if needed
    });
});