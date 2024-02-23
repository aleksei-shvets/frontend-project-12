import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';
import {
  BrowserRouter, Route, Routes, Navigate,
} from 'react-router-dom';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Home from './pages/Home.jsx';
import NotFound from './pages/NotFound.jsx';
import AuthProvider from './providers/authProvider.js';
import SocketProvider from './providers/socketProvider.js';
import ROUTES from './pages/route.jsx';
import useAuth from './hooks/useAuth.js';
import Nav from './components/Nav.jsx';

const PrivateRoute = ({ children }) => {
  const auth = useAuth();

  return (
    auth.loggedIn ? children : <Navigate to={ROUTES.login} />
  );
};

const App = () => (
  <AuthProvider>
    <SocketProvider>
      <Nav />
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.login} element={<Login />} />
          <Route path={ROUTES.signup} element={<Signup />} />
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
);

export default App;
