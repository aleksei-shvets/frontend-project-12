import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';
import {
  BrowserRouter, Route, Routes, Navigate,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/index.js';
import Login from './pages/Login.jsx';
import Home from './pages/Home.jsx';
import NotFound from './pages/NotFound.jsx';
import AuthProvider from './providers/authProvider.js';
import SocketProvider from './providers/socketProvider.js';
import ROUTES from './pages/route.jsx';
import useAuth from './hooks/useAuth.js';
// import ModalProvider from './providers/modalProvider.js';
import Nav from './components/Nav.jsx';

const PrivateRoute = ({ children }) => {
  const auth = useAuth();

  return (
    auth.loggedIn ? children : <Navigate to={ROUTES.login} />
  );
};

const App = () => (
  <Provider store={store}>
    <AuthProvider>
      <SocketProvider>
        <Nav />
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
      </SocketProvider>
    </AuthProvider>
  </Provider>
);

export default App;
