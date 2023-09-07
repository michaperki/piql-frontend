import React from 'react';
import { render } from '@testing-library/react';
import Games from '../Games';
import "../../../setupTests"

describe('Games Component', () => {
    it('should render the Games', () => {
        render(<Games />);
        // Add any assertions or expectations here if needed
    });
});