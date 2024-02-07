const MessagesHeader = ({ currentChannel }) => (
  <div className="bg-light mb-4 p-3 shadow-sm small">
    <p className="m-0">
      <b>{`# ${currentChannel ? currentChannel.name : null}`}</b>
    </p>
    <span className="text-muted">0 сообщений</span>
  </div>
);

export default MessagesHeader;
