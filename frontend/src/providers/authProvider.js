import {
  useState, useCallback, useMemo,
} from 'react';
import AutorizeContext from '../contexts/authContext.js';

const AuthProvider = ({ children }) => {
  const isloggedUser = localStorage.getItem('user');
  // const initUserState = isloggedUser ? JSON.parse(isloggedUser) : null;

  const [username, setUsername] = useState(null);

  const getToken = useCallback(() => {
    if (isloggedUser) {
      const userToken = JSON.parse(localStorage.getItem('userToken'));
      return { Authorization: `Bearer ${userToken}` };
    }

    return {};
  });

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
    getToken,
  }), [logIn, logOut, username, getToken]);

  return (
    <AutorizeContext.Provider value={propMemo}>
      {children}
    </AutorizeContext.Provider>
  );
};

export default AuthProvider;
