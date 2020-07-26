import React from 'react';
import { render, fireEvent, screen } from '../../utils/test.utils';
import App from '../../components/App';

it('renders parent app component', () => {
  const { getByText } = render(<App match={{params: {page: 0}}}/>);
  const linkElement = getByText(/No data to display/i);
  expect(linkElement).toBeInTheDocument();
});
