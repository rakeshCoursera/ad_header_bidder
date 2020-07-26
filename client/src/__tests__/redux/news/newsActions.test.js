import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as types from '../../../redux/news/newsTypes';
import * as actions from '../../../redux/news/newsActions';
import moxios from 'moxios';
import expect from 'expect';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)


describe('actions', () => {
    it('should create an action to upvote news', () => {
        const newsID = 'some new ID';
        const expectedAction = {
            type: types.INCREMENT_VOTE,
            payload: newsID
        }
        expect(actions.incrementVote(newsID)).toEqual(expectedAction)
    });

    it('should create an action to hide news', () => {
        const newsID = 'some new ID';
        const expectedAction = {
            type: types.HIDE_NEWS,
            payload: newsID
        }
        expect(actions.hideNews(newsID)).toEqual(expectedAction)
    });

    it('should create an action to fetch news request', () => {
        const page = 0;
        const expectedAction = {
            type: types.FETCH_NEWS_REQUEST,
            payload: page
        }
        expect(actions.fetchNewsRequest(page)).toEqual(expectedAction)
    });

    it('should create an action to fetch news success', () => {
        const news = { hits: [], page: 0 };
        const expectedAction = {
            type: types.FETCH_NEWS_SUCCESS,
            payload: news
        }
        expect(actions.fetchNewsSuccess(news)).toEqual(expectedAction)
    });

    it('should create an action to fetch news failure', () => {
        const error = "network error";
        const expectedAction = {
            type: types.FETCH_NEWS_FAILURE,
            payload: error
        }
        expect(actions.fetchNewsFailure(error)).toEqual(expectedAction)
    });
});

describe('async fetchNews actions', () => {
    beforeEach(function () {
        moxios.install();
    });

    afterEach(function () {
        moxios.uninstall();
    });

    it('creates FETCH_NEWS_SUCCESS when fetching news has been done', () => {
        const page = 0;
        const body = {
            hits: [
                {
                    title: "test title",
                    url: "test url",
                    story_title: "test story title",
                    story_url: "test story url",
                }
            ]
        }

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: body,
            });
        });

        const expectedSuccessActions = [
            { type: types.FETCH_NEWS_REQUEST, payload: page },
            { type: types.FETCH_NEWS_SUCCESS, payload: body }
        ]
        const store = mockStore({
            loading: true,
            news: {},
            error: ''
        })

        return store.dispatch(actions.fetchNews(page)).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedSuccessActions);
        })
    });

    it('creates FETCH_NEWS_FAILURE when fetching news with error', () => {
        const page = 0;
        const body = 'Request failed with status code 500';
        

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 500,
                response: body,
            });
        });

        const expectedFailureActions = [
            { type: types.FETCH_NEWS_REQUEST, payload: page },
            { type: types.FETCH_NEWS_FAILURE, payload: body }
        ]
        const store = mockStore({
            loading: true,
            news: {},
            error: ''
        })

        return store.dispatch(actions.fetchNews(page)).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedFailureActions);
        })
    });
});



