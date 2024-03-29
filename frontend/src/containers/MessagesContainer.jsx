import { useSelector } from 'react-redux';
import { channelsSelector, currentChannelIdSelector } from '../store/slices/channelsSlice.js';
import { messagesSelectors } from '../store/slices/messagesSlice.js';
import MessagesHeader from '../components/MessagesHeader.jsx';
import MessagesList from '../components/MessagesList.jsx';

const MessagesContainer = () => {
  const currentChannelId = useSelector((state) => currentChannelIdSelector(state));
  const currentChannel = useSelector(
    (state) => channelsSelector.selectById(state, currentChannelId),
  );
  const messages = useSelector((state) => messagesSelectors.selectAll(state))
    .filter((message) => Number(message.channelId) === Number(currentChannelId));
  const messagesCout = messages.length;
  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <MessagesHeader currentChannel={currentChannel} messagesCout={messagesCout} />
        <MessagesList messages={messages} currentChannelId={currentChannelId} />
      </div>
    </div>
  );
};

export default MessagesContainer;
