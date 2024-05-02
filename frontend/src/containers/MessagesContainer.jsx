import { useSelector } from 'react-redux';
import MessagesHeader from '../components/MessagesHeader.jsx';
import MessagesList from '../components/MessagesList.jsx';
import { messageSelectors, channelSelectors } from '../store/slices/selectors.js';

const MessagesContainer = () => {
  const currentChannelId = useSelector(channelSelectors.currentChannelIdSelector);

  const currentChannel = useSelector(channelSelectors.currentChannel);

  const messages = useSelector(messageSelectors.filtredMessages);

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
