import i18next from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import { io } from 'socket.io-client';
import { Provider } from 'react-redux';
import resources from './locales/index.js';
import SocketProvider from './providers/socketProvider.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';
import store from './store/index.js';
import App from './App.jsx';

i18next
  .use(initReactI18next)
  .init({
    resources,
    debug: true,
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false,
    },
  });

const newSocket = io();

const InitialApp = () => (
  <I18nextProvider i18n={i18next} defaultNS="translation">
    <Provider store={store}>
      <SocketProvider newSocket={newSocket}>
        <App />
      </SocketProvider>
    </Provider>
  </I18nextProvider>
);

export default InitialApp;
