import { useContext } from 'react';

import AutorizeContext from '../contexts/authContext.js';

const useAuth = () => useContext(AutorizeContext);

export default useAuth;
