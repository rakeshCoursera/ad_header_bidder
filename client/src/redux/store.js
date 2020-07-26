import { createBrowserHistory } from 'history'
import { createStore, compose, applyMiddleware } from 'redux';
import { routerMiddleware } from 'connected-react-router'
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
// import logger from 'redux-logger';
import { persistStore } from 'redux-persist';

import config from '../config/config';
import createRootReducer, { persistConfig } from './rootReducer';

export const history = createBrowserHistory()

const persistedReducer = persistReducer(persistConfig, createRootReducer(history))

// store configuration with persistent storage and browser history object
export default function configureStore(preloadedState) {
    const store = createStore(
        persistedReducer,
        preloadedState,
        config.env === 'dev' ? composeWithDevTools(applyMiddleware(routerMiddleware(history), thunk)) :
        compose(applyMiddleware(routerMiddleware(history), thunk))
    );
    
    const persistor = persistStore(store);
    return { store, persistor };
};