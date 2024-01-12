import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import SearchComponent from './SearchComponent';

describe('SearchComponent', () => {
    const mockOnSearch = jest.fn();

    beforeEach(() => {
        render(<SearchComponent onSearch={mockOnSearch} />);
    });

    it('renders correctly', () => {
        expect(screen.getByPlaceholderText('Title')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Year')).toBeInTheDocument();
        expect(screen.getByText('Search')).toBeInTheDocument();
    });

    it('calls onSearch with correct parameters', () => {
        fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: 'Inception' } });
        fireEvent.change(screen.getByPlaceholderText('Year'), { target: { value: '2010' } });
        fireEvent.click(screen.getByText('Search'));
        expect(mockOnSearch).toHaveBeenCalledWith('Inception', '', '2010');
    });

    it('renders and matches snapshot', () => {
        const { asFragment } = render(<SearchComponent />);
        expect(asFragment()).toMatchSnapshot();
    });
});
