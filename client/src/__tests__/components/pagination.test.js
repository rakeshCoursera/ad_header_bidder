import React from 'react';
import { render } from '@testing-library/react';
import Pagination from '../../components/pagination';

it('renders pagination when on initial page', () => {
    const mockPush = jest.fn()
    const { getByText } = render(<Pagination page={0} num_pages={10} push={mockPush} />);
    const linkElement = getByText(/Next/i);
    expect(linkElement).toBeInTheDocument();
});

it('renders pagination when on last page', () => {
    const mockPush = jest.fn()
    const { getByText } = render(<Pagination page={9} num_pages={10} push={mockPush} />);
    const linkElement = getByText(/Previous/i);
    expect(linkElement).toBeInTheDocument();
});

it('renders pagination when on not on initial or last page', () => {
    const mockPush = jest.fn()
    const { getByText } = render(<Pagination page={2} num_pages={10} push={mockPush} />);
    const linkElement = getByText(/Next/i);
    expect(linkElement).toBeInTheDocument();
    const linkElement1 = getByText(/Previous/i);
    expect(linkElement1).toBeInTheDocument();
});