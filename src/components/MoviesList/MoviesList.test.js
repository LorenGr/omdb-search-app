// src/components/SearchComponent.test.js
import React from 'react';
import { render } from '@testing-library/react';
import MoviesList from './MoviesList';

it('renders and matches snapshot', () => {
    const { asFragment } = render(<MoviesList />);
    expect(asFragment()).toMatchSnapshot();
});
