import * as types from '../../../redux/news/newsTypes';
import reducer from '../../../redux/news/newsReducers';

describe('news reducer', () => {
    const initialState = {
        loading: false,
        news: {},
        error: ''
    }

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('should handle FETCH_NEWS_REQUEST action', () => {
        expect(
            reducer(initialState, {
                type: types.FETCH_NEWS_REQUEST,
                payload: 0,
            })
        ).toEqual({
            loading: true,
            news: {},
            error: ''
        })

        expect(
            reducer({
                loading: false,
                news: { hits: [{ objectID: '1234' }, { objectID: '3456' }] },
                error: ''
            }, {
                type: types.FETCH_NEWS_REQUEST,
                payload: 1,
            })
        ).toEqual({
            loading: false,
            news: { hits: [{ objectID: '1234' }, { objectID: '3456' }] },
            error: ''
        })

        expect(
            reducer({
                loading: false,
                news: {},
                error: 'network error'
            }, {
                type: types.FETCH_NEWS_REQUEST,
                payload: 1,
            })
        ).toEqual({
            loading: false,
            news: {},
            error: 'network error'
        })
    });

    it('should handle FETCH_NEWS_SUCCESS action', () => {
        expect(
            reducer(initialState, {
                type: types.FETCH_NEWS_SUCCESS,
                payload: { hits: [{ objectID: '1234' }, { objectID: '3456' }] },
            })
        ).toEqual({
            loading: false,
            news: { hits: [{ objectID: '1234' }, { objectID: '3456' }] },
            error: ''
        });
    });

    it('should handle FETCH_NEWS_FAILURE action', () => {
        expect(
            reducer(initialState, {
                type: types.FETCH_NEWS_FAILURE,
                payload: 'internal server error',
            })
        ).toEqual({
            loading: false,
            news: {},
            error: 'internal server error'
        });
    });

    it('should handle INCREMENT_VOTE action', () => {
        try {
            expect(
                reducer(initialState, {
                    type: types.INCREMENT_VOTE,
                    payload: '1234',
                })
            ).toEqual(initialState);
        } catch (err) {
            expect(err.message).toMatch("Cannot read property 'forEach' of undefined");
        }

        expect(
            reducer({
                loading: false,
                news: {hits: [{ objectID: '1234', points: 1}, { objectID: '3456', points: 5}]},
                error: ''
            }, {
                type: types.INCREMENT_VOTE,
                payload: '1234',
            })
        ).toEqual({
            loading: false,
            news: {hits: [{ objectID: '1234', points: 2}, { objectID: '3456', points: 5}]},
            error: ''
        });
    });

    it('should handle HIDE_NEWS action', () => {
        try {
            expect(
                reducer(initialState, {
                    type: types.HIDE_NEWS,
                    payload: '1234',
                })
            ).toEqual(initialState);
        } catch (err) {
            expect(err.message).toMatch("Cannot read property 'filter' of undefined");
        }

        expect(
            reducer({
                loading: false,
                news: {hits: [{ objectID: '1234', points: 1}, { objectID: '3456', points: 5}]},
                error: ''
            }, {
                type: types.HIDE_NEWS,
                payload: '1234',
            })
        ).toEqual({
            loading: false,
            news: {hits: [{ objectID: '3456', points: 5}]},
            error: ''
        });
    });
});



