import React from 'react';
import { render, fireEvent, screen } from '../../utils/test.utils';
import Table from '../../containers/table';

it('Renders the connected app with initialState', () => {
    const mockIncrementVote = jest.fn();
    const mockHideNews = jest.fn();
    const headers = ['Comments', 'Vote Count', 'UpVote', 'News Details'];
    const mockData = [{
        story_title: 'testing can be tricky',
        title: null,
        story_url: 'www.google.com',
        url: null,
        created_at_i: 1592333207,
        num_comments: 2,
        points: 5,
        author: 'rakesh'
    }, {
        story_title: 'redux testing',
        title: null,
        story_url: 'www.yahoo.com',
        url: null,
        created_at_i: 1592333270,
        num_comments: 3,
        points: 8,
        author: 'yash'
    }];

    render(<Table headers={headers} data={mockData} hideNews={mockHideNews} incrementVote={mockIncrementVote} />);

    expect(screen.getByText(/redux testing/ig)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/testing can be tricky/ig))    
})



