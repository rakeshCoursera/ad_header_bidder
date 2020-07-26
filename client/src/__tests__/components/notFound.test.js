import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../../components/notFound';

it('renders page not found message', () => {
  const { getByText } = render(<NotFound />);
  const linkElement = getByText(/404 page not found/i);
  expect(linkElement).toBeInTheDocument();
});