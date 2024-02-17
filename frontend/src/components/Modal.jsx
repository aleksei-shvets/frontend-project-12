import AddChannelModal from './AddChannelModal.jsx';
import RenameChannelModal from './RenameChannelModal.jsx';
import RemoveChannelModal from './RemoveChannelModal.jsx';

const ModalItem = ({ type }) => {
  const modalTypes = {
    addingChannel: <AddChannelModal />,
    removingChannel: <RemoveChannelModal />,
    renamingChannel: <RenameChannelModal />,
  };
  return modalTypes[type];
};

export default ModalItem;
