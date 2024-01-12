// src/components/__tests__/MovieCard.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MovieCard from './MovieCard';

describe('MovieCard', () => {
    const mockTitle = 'Inception';
    const mockImage = 'https://example.com/inception.jpg';
    const mockType = 'movie';
    const mockYear = '2010';

    it('renders correctly with given props', () => {
        render(<MovieCard title={mockTitle} image={mockImage} type={mockType} year={mockYear} />);

        expect(screen.getByText(mockTitle)).toBeInTheDocument();
        expect(screen.getByAltText(mockTitle)).toHaveAttribute('src', mockImage);
        expect(screen.getByText(mockType)).toBeInTheDocument();
        expect(screen.getByText(mockYear)).toBeInTheDocument();
    });

    // Test for fallback image logic
    it('displays fallback image on image load error', () => {
        render(<MovieCard title={mockTitle} image={mockImage} />);
        const image = screen.getByAltText(mockTitle);
        fireEvent.error(image);
        expect(image).toHaveAttribute('src', 'default.jpg');
    });
});
