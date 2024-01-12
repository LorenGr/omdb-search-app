// src/components/SearchComponent.test.js
import React from 'react';
import { render } from '@testing-library/react';
import NoResults from './NoResults';

it('renders and matches snapshot', () => {
    const { asFragment } = render(<NoResults />);
    expect(asFragment()).toMatchSnapshot();
});
