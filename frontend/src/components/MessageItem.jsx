import cn from 'classnames';

const MessageItem = ({ item, userType }) => {
  const containerClasses = cn('container', 'pl-3', 'mb-4', 'row', {
    'text-end': (userType === 'CurrentUserMessage'),
  });
  const textsBoxClasses = cn('rounded', 'px-3', 'py-1', 'm-0', 'text-break', {
    'bg-secondary-subtle': (userType === 'CurrentUserMessage'),
    'bg-info-subtle': (userType === 'OtherUsersMessage'),
  });
  return (
    <div className={containerClasses}>
      {userType === 'CurrentUserMessage' ? <div className="col-lg-2" /> : null}
      <div className="col-10">
        <div className={textsBoxClasses}>
          <p className="fw-bold m-0 small mb-2">{`${item?.username}:`}</p>
          {item?.body}
        </div>
      </div>
      {userType === 'OtherUsersMessage' ? <div className="col-lg-2" /> : null}
    </div>
  );
};
/* import cn from 'classnames';

const MessageItem = ({ item }) => {
  const containerClasses = cn('container', 'pl-3', 'mb-4', 'row');

  return (
    <div className={containerClasses}>
      <p>{`${item?.username}: ${item?.body}`}</p>
    </div>
  );
}; */

export default MessageItem;
