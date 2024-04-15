import {
  useState, useCallback, useMemo,
} from 'react';
import AutorizeContext from '../contexts/authContext.js';

const AuthProvider = ({ children }) => {
  const isloggedUser = localStorage.getItem('user');
  const initUserState = isloggedUser ? JSON.parse(isloggedUser) : null;

  const [username, setUsername] = useState(initUserState);

  const logIn = useCallback((userData) => {
    localStorage.setItem('user', JSON.stringify(userData.username));
    localStorage.setItem('userToken', JSON.stringify(userData.token));
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
  }), [logIn, logOut, username]);

  return (
    <AutorizeContext.Provider value={propMemo}>
      {children}
    </AutorizeContext.Provider>
  );
};

export default AuthProvider;
