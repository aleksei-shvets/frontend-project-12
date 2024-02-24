import { useTranslation } from 'react-i18next';
import AddChannelModal from './AddChannelModal.jsx';
import RenameChannelModal from './RenameChannelModal.jsx';
import RemoveChannelModal from './RemoveChannelModal.jsx';

const { t } = useTranslation();

export default ({ type, toastHandler }) => {
  const modalTypes = {
    addingChannel: <AddChannelModal toastHandler={toastHandler} t={t} />,
    removingChannel: <RemoveChannelModal toastHandler={toastHandler} t={t} />,
    renamingChannel: <RenameChannelModal toastHandler={toastHandler} t={t} />,
  };
  return modalTypes[type];
};
