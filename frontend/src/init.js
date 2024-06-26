import i18next from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import { io } from 'socket.io-client';
import { Provider } from 'react-redux';
import { ErrorBoundary, Provider as RollbarProvider } from '@rollbar/react';
import { ToastContainer } from 'react-toastify';
import resources from './locales/index.js';
import SocketProvider from './providers/socketProvider.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';
import store from './store/index.js';
import AuthProvider from './providers/authProvider.js';
import 'react-toastify/dist/ReactToastify.css';
import rollbarConfig from './config/rollbarConfig.js';
import ProfanityProvider from './providers/profanityProvider.js';

const Init = ({ children }) => {
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

  return (
    <AuthProvider>
      <I18nextProvider i18n={i18next} defaultNS="translation">
        <ProfanityProvider>
          <RollbarProvider config={rollbarConfig}>
            <ErrorBoundary>
              <Provider store={store}>
                <SocketProvider newSocket={newSocket}>
                  {children}
                  <ToastContainer />
                </SocketProvider>
              </Provider>
            </ErrorBoundary>
          </RollbarProvider>
        </ProfanityProvider>
      </I18nextProvider>
    </AuthProvider>
  );
};

export default Init;
