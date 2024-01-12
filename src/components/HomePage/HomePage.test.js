// src/components/SearchComponent.test.js
import React from 'react';
import { render } from '@testing-library/react';
import HomePage from './HomePage';

it('renders and matches snapshot', () => {
    const { asFragment } = render(<HomePage />);
    expect(asFragment()).toMatchSnapshot();
});
