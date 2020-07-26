import {
    FETCH_NEWS_REQUEST,
    FETCH_NEWS_SUCCESS,
    FETCH_NEWS_FAILURE,
    INCREMENT_VOTE,
    HIDE_NEWS
} from './newsTypes';

const initialState = {
    loading: false,
    news: {},
    error: ''
};

// pure component reducer
function reducer(state = initialState, action){
    switch (action.type) {
        case FETCH_NEWS_REQUEST:
            return {
                ...state,
                loading: !action.payload
            }
        case FETCH_NEWS_SUCCESS:
            return {
                loading: false,
                news: action.payload,
                error: ''
            }
        case FETCH_NEWS_FAILURE:
            return {
                loading: false,
                news: {},
                error: action.payload
            }
        case INCREMENT_VOTE:
            const newsCopy = Object.assign({}, state.news);
            newsCopy.hits.forEach(element => {
                if (element.objectID === action.payload) {
                    element.points += 1
                }
            });
            return {
                ...state,
                news: newsCopy
            }
        case HIDE_NEWS:
            const newsClone = Object.assign({}, state.news);
            newsClone.hits = newsClone.hits.filter(val => val.objectID !== action.payload);
            return {
                ...state,
                news: newsClone
            }
        default: return state
    }
}

export default reducer;
