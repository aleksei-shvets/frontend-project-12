import { useTranslation } from 'react-i18next';

const MessagesHeader = ({ currentChannel, messagesCout }) => {
  const { t } = useTranslation();
  console.log(t('chatHeaders.messagesCount.key', { count: messagesCout }));
  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b>{`# ${currentChannel ? currentChannel.name : null}`}</b>
      </p>
      <span className="text-muted">{t('messageCount', { count: messagesCout })}</span>
    </div>
  );
};

export default MessagesHeader;
