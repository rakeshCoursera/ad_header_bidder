import React from 'react';
import { push } from 'connected-react-router';
import { useSelector, useDispatch } from 'react-redux';

// Pagination component
function Pagination({ page }) {
    const news = useSelector(state => state.news.news);
    const dispatch = useDispatch()
    return (
        page > 0 && page !== news.nbPages - 1 ?
        <p><b><span onClick={() => dispatch(push(`/page/${page - 1}`))}>Previous</span> | <span onClick={() => dispatch(push(`/page/${page + 1}`))}>Next</span></b></p> :
        page === 0 ? <p><b><span onClick={() => dispatch(push(`/page/${page + 1}`))}>Next</span></b></p> :
        <p><b><span onClick={() => dispatch(push(`/page/${page - 1}`))}>Previous</span></b></p>
    );
}

export default Pagination;