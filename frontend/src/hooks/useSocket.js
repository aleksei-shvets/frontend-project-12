import { useContext } from 'react';

import SocketContext from '../contexts/socketContext.js';

const useSocket = () => useContext(SocketContext);

export default useSocket;
