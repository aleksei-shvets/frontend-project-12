import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';
import { useState } from 'react';
import {
  BrowserRouter, Route, Routes, Navigate,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/index.js';
import Login from './pages/Login.jsx';
import Home from './pages/Home.jsx';
import NotFound from './pages/NotFound.jsx';
import AutorizeContext from './contexts/index.js';
import ROUTES from './pages/route.jsx';
import useAuth from './hooks/index.js';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AutorizeContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </AutorizeContext.Provider>
  );
};

const PrivateRoute = ({ children }) => {
  const auth = useAuth();

  return (
    auth.loggedIn ? children : <Navigate to={ROUTES.login} />
  );
};

const App = () => (
  <Provider store={store}>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.login} element={<Login />} />
          <Route path={ROUTES.notFound} element={<NotFound />} />
          <Route
            path={ROUTES.home}
            element={(
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            )}
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </Provider>
);

export default App;
