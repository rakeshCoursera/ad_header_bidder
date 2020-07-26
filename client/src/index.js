import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { PersistGate } from 'redux-persist/integration/react'
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';

import configureStore, { history } from './redux/store';
import AppRoutes from './routes';
import theme from './theme';

const {store, persistor} = configureStore()


export default function App() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <PersistGate loading={null} persistor={persistor}>
          <React.StrictMode>
            <ThemeProvider theme={theme}>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
                <AppRoutes />
            </ThemeProvider>
          </React.StrictMode>
        </PersistGate>
      </ConnectedRouter>
    </Provider>
  );
}

ReactDOM.hydrate(<App />, document.getElementById('root'));


