import { useSelector } from 'react-redux';
import { channelsSelector, currentChannelIdSelector } from '../store/slices/channelsSlice.js';
import { selectMessagesByChannelId } from '../store/slices/messagesSlice.js';
import MessagesHeader from '../components/MessagesHeader.jsx';
import MessagesList from '../components/MessagesList.jsx';

const MessagesContainer = () => {
  const currentChannelId = useSelector((state) => currentChannelIdSelector(state));
  const currentChannel = useSelector(
    (state) => channelsSelector.selectById(state, currentChannelId),
  );

  const messages = useSelector((state) => selectMessagesByChannelId(state, currentChannelId));
  const messagesCount = messages.length;
  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <MessagesHeader currentChannel={currentChannel} messagesCount={messagesCount} />
        <MessagesList messages={messages} currentChannelId={currentChannelId} />
      </div>
    </div>
  );
};

export default MessagesContainer;
