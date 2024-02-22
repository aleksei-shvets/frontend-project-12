import AddChannelModal from './AddChannelModal.jsx';
import RenameChannelModal from './RenameChannelModal.jsx';
import RemoveChannelModal from './RemoveChannelModal.jsx';

export default ({ type, toastHandler }) => {
  const modalTypes = {
    addingChannel: <AddChannelModal toastHandler={toastHandler} />,
    removingChannel: <RemoveChannelModal toastHandler={toastHandler} />,
    renamingChannel: <RenameChannelModal toastHandler={toastHandler} />,
  };
  return modalTypes[type];
};
