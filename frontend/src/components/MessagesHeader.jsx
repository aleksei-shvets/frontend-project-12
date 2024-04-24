import { useTranslation } from 'react-i18next';

const MessagesHeader = ({ currentChannel, messagesCount }) => {
  const { t } = useTranslation();
  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b>{`# ${currentChannel ? currentChannel.name : null}`}</b>
      </p>
      <span className="text-muted">{t('messageCount', { count: messagesCount })}</span>
    </div>
  );
};

export default MessagesHeader;
