// SocketContext.js
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import SocketContext from '../contexts/socketContext';
import { messageActions } from '../store/slices/messagesSlice.js';
import { channelActions } from '../store/slices/channelsSlice.js';

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io('http://localhost:5001', {
      transports: ['websocket'],
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('newMessage', (payload) => {
        messageActions.addMessage(payload);
      });

      socket.on('newChannel', (payload) => {
        channelActions.addChannel(payload);
      });

      socket.on('removeChannel', (payload) => {
        channelActions.removeChannel(payload.id);
      });

      socket.on('renameChannel', (payload) => {
        console.log(payload);
      });
    }
  }, [socket]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
