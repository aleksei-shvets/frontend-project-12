import {
  useState, useCallback, useMemo,
} from 'react';
import AutorizeContext from '../contexts/authContext.js';

const AuthProvider = ({ children }) => {
  const isLogged = localStorage.getItem('userToken');
  const [loggedIn, setLoggedIn] = useState(isLogged);

  const logIn = useCallback(() => setLoggedIn(true));
  const logOut = useCallback(() => {
    localStorage.removeItem('userToken');
    setLoggedIn(false);
  });

  const prop = useMemo(() => ({ loggedIn, logIn, logOut }), [loggedIn, logIn, logOut]);

  return (
    <AutorizeContext.Provider value={prop}>
      {children}
    </AutorizeContext.Provider>
  );
};

export default AuthProvider;
