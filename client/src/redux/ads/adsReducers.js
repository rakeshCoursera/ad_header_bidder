import {
    FETCH_ADS_REQUEST,
    FETCH_ADS_SUCCESS,
    FETCH_ADS_FAILURE,
} from './adsTypes';

const initialState = {
    loading: false,
    ads: {},
    error: ''
};

// pure component reducer
function reducer(state = initialState, action){
    switch (action.type) {
        case FETCH_ADS_REQUEST:
            return {
                ...state,
                loading: !action.payload
            }
        case FETCH_ADS_SUCCESS:
            return {
                loading: false,
                ads: action.payload,
                error: ''
            }
        case FETCH_ADS_FAILURE:
            return {
                loading: false,
                ads: {},
                error: action.payload
            }
        default: return state
    }
}

export default reducer;
