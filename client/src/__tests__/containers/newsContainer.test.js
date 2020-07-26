import React from 'react';
import { render, screen } from '../../utils/test.utils';
import NewsContainer from '../../containers/newsContainer';

it('Renders the connected app with initialState', () => {
    const mockFetchNews = jest.fn();
    const mockPush = jest.fn();
    let newsData = {
        loading: false,
        news: {},
        error: ''
    }

    render(<NewsContainer page={0} newsData={newsData} fetchNews={mockFetchNews} push={mockPush} />);
    expect(screen.getByText(/No data to display/i)).toBeInTheDocument();
});

// Have to figure out the error
// Error while setting react state: Actions must be plain objects. Use custom middleware for async actions.
// newsData = {
//     loading: true,
//     news: {},            
//     error: ''
// }

// render(<NewsContainer page={0} newsData={newsData} fetchNews={mockFetchNews} push={mockPush} />,
//     {initialState: {news: newsData}});
// expect(screen.getByText(/Loading/i)).toBeInTheDocument();