import React from 'react';
import { render } from '@testing-library/react';
import Court from '../Court';
import "../../../setupTests"

describe('Court Component', () => {
    it('should render the court', () => {
        render(<Court />);
        // Add any assertions or expectations here if needed
    });
});