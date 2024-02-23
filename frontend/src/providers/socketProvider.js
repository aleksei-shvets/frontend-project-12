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
        dispatch(messageActions.addMessage(payload));
      });

      socket.on('newChannel', (payload) => {
        dispatch(channelActions.addChannel(payload));
      });

      socket.on('removeChannel', (payload) => {
        dispatch(channelActions.removeChannel(payload.id));
        console.log(payload);
      });

      socket.on('renameChannel', (payload) => {
        console.log(payload.name);
        dispatch(channelActions.renameChannel({
          id: payload.id,
          changes: {
            name: payload.name,
          },
        }));
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
