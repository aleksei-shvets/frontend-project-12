import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider, ErrorBoundary } from '@rollbar/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InitialApp from './init.js';
import reportWebVitals from './reportWebVitals.js';

const rollbarConfig = {
  accessToken: '4b987b57e0a942219b45621aef79f7c6',
  environment: 'production',
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
        <InitialApp />
        <ToastContainer />
      </ErrorBoundary>
    </Provider>
  </React.StrictMode>,
);

reportWebVitals();
