import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';
import {
  BrowserRouter, Route, Routes, Navigate,
} from 'react-router-dom';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Home from './pages/Home.jsx';
import NotFound from './pages/NotFound.jsx';
import { ROUTES } from './routes.js';
import useAuth from './hooks/useAuth.js';
import Nav from './components/Nav.jsx';

const PrivateRoute = ({ children }) => {
  const auth = useAuth();

  return (
    auth.username ? children : <Navigate to={ROUTES.login} />
  );
};

const App = () => (
  <>
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
  </>
);

export default App;
