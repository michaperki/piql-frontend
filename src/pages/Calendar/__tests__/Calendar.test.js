import React from 'react';
import { render } from '@testing-library/react';
import Calendar from '../Calendar';
import "../../../setupTests"

describe('Calendar Component', () => {
    it('should render the dashboard', () => {
        render(<Calendar />);
        // Add any assertions or expectations here if needed
    });
});