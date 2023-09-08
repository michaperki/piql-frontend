import React from 'react';
import { render } from '@testing-library/react';
import CourtSelector from '../CourtSelector';
import "../../../setupTests"

describe('CourtSelector Component', () => {
    it('should render the dashboard', () => {
        render(<CourtSelector />);
        // Add any assertions or expectations here if needed
    });
});