import MessagesHeader from '../components/MessagesHeader';
import MessagesList from '../components/MessagesList';

const MessagesContainer = () => {
  const currentChannel = 1;
  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <MessagesHeader currentChannel={currentChannel} />
        <MessagesList />
      </div>
    </div>
  );
};

export default MessagesContainer;
