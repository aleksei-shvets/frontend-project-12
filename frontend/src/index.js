import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider, ErrorBoundary } from '@rollbar/react'; // Provider imports 'rollbar'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './App.jsx';
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
        <App />
        <ToastContainer />
      </ErrorBoundary>
    </Provider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
