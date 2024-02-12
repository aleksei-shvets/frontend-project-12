import {
  useState, useCallback, useMemo,
} from 'react';
import AutorizeContext from '../contexts/authContext.js';

const AuthProvider = ({ children }) => {
  const isLogged = localStorage.getItem('userToken');
  const isLoggedUser = JSON.parse(localStorage.getItem('username'));
  const [loggedIn, setLoggedIn] = useState(isLogged);
  const [username, setUsername] = useState(isLoggedUser);

  const setUser = useCallback(() => setUsername(isLoggedUser));
  const logIn = useCallback(() => setLoggedIn(true));
  const logOut = useCallback(() => {
    localStorage.removeItem('userToken');
    setLoggedIn(false);
  });

  const prop = useMemo(() => ({
    loggedIn,
    logIn,
    logOut,
    username,
    setUser,
  }), [loggedIn, logIn, logOut, username, setUser]);

  return (
    <AutorizeContext.Provider value={prop}>
      {children}
    </AutorizeContext.Provider>
  );
};

export default AuthProvider;
