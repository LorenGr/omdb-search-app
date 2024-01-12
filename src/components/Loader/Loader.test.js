// src/components/SearchComponent.test.js
import React from 'react';
import { render } from '@testing-library/react';
import Loader from './Loader';

it('renders and matches snapshot', () => {
    const { asFragment } = render(<Loader />);
    expect(asFragment()).toMatchSnapshot();
});
