// src/components/SearchComponent.test.js
import React from 'react';
import { render } from '@testing-library/react';
import ErrorAlert from './ErrorAlert';

it('renders and matches snapshot', () => {
    const { asFragment } = render(<ErrorAlert />);
    expect(asFragment()).toMatchSnapshot();
});
