import {
  useState, useCallback, useMemo,
} from 'react';
import AutorizeContext from '../contexts/authContext.js';

const AuthProvider = ({ children }) => {
  const isloggedUser = localStorage.getItem('user');
  const initUserState = isloggedUser || null;

  const [username, setUsername] = useState(initUserState);

  const getAuthHeader = useCallback(() => {
    const userToken = localStorage.getItem('userToken');

    if (userToken) {
      return { Authorization: `Bearer ${userToken}` };
    }

    return {};
  });

  const logIn = useCallback((userData) => {
    localStorage.setItem('user', userData.username);
    localStorage.setItem('userToken', userData.token);
    setUsername(userData.username);
  });

  const logOut = useCallback(() => {
    localStorage.removeItem('user');
    localStorage.removeItem('userToken');
    setUsername('');
  });

  const propMemo = useMemo(() => ({
    logIn,
    logOut,
    username,
    getAuthHeader,
  }), [logIn, logOut, username, getAuthHeader]);

  return (
    <AutorizeContext.Provider value={propMemo}>
      {children}
    </AutorizeContext.Provider>
  );
};

export default AuthProvider;
