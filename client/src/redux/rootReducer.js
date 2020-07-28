import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import storage from 'redux-persist/lib/storage';

// root redcucer which combnes all the reducers with browser hisory object
import newsReducer from './news/newsReducers';
import adsReducer from './ads/adsReducers'

export const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['news'],
    blacklist: ['router'] 
}

const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    news: newsReducer,
    ads: adsReducer,
});

export default createRootReducer;