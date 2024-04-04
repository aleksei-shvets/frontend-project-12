import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import SocketContext from '../contexts/socketContext';
import { messageActions } from '../store/slices/messagesSlice.js';
import { channelActions } from '../store/slices/channelsSlice.js';

const SocketProvider = ({ children, newSocket }) => {
  const [socket, setSocket] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    setSocket(newSocket);

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('newMessage', (payload) => {
        console.log(payload);
        dispatch(messageActions.addMessage(payload));
      });

      socket.on('newChannel', (payload) => {
        console.log(payload);
        dispatch(channelActions.addChannel(payload));
      });

      socket.on('removeChannel', (payload) => {
        dispatch(channelActions.removeChannel(payload.id));
      });

      socket.on('renameChannel', (payload) => {
        const { id, name } = payload;
        dispatch(channelActions.renameChannel({ id, changes: { name } }));
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
