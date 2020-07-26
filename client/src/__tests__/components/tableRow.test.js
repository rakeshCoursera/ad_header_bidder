import React from 'react';
import { render } from '@testing-library/react';
import TableRow from '../../components/tableRow';

it('renders table rows', () => {
    const mockIncrementVote= jest.fn();
    const mockHideNews = jest.fn();
    const mockData = {
        story_title:'testing can be tricky',
        title:null,
        story_url:'www.google.com',
        url: null,
        created_at_i: 1592333207,
        num_comments:2,
        points: 5,
        author:'rakesh'
    }
    const { getByText } = render(<TableRow data={mockData} incrementVote={mockIncrementVote} hideNews={mockHideNews} />);
    const linkElement = getByText(/testing can be tricky/i);
    expect(linkElement).toBeInTheDocument();
});