import {
  useState, useCallback, useMemo,
} from 'react';
import AutorizeContext from '../contexts/authContext.js';

const AuthProvider = ({ children }) => {
  // const loggedUser = localStorage.getItem('user');
  const initUserState = null;

  const [username, setUsername] = useState(initUserState);

  const setUser = useCallback((currentUser) => setUsername(currentUser), []);

  const logIn = useCallback((userData) => {
    localStorage.setItem('user', JSON.stringify(userData.username));
    localStorage.setItem('userToken', JSON.stringify(userData.token));
    setUser(userData.username);
  }, [setUser]);

  const logOut = useCallback(() => {
    localStorage.removeItem('user');
    localStorage.removeItem('userToken');
    setUsername('');
  }, [username]);

  const propMemo = useMemo(() => ({
    logIn,
    logOut,
    username,
  }), [logIn, logOut, username]);

  return (
    <AutorizeContext.Provider value={propMemo}>
      {children}
    </AutorizeContext.Provider>
  );
};

export default AuthProvider;
