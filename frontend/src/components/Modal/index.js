import { useTranslation } from 'react-i18next';
import Modal from './Modal.jsx';

const modalTypes = {
  addingChannel: 'addingChannel',
  removingChannel: 'removingChannel',
  renamingChannel: 'renamingChannel',
};

export default ({ type, toastHandler }) => {
  const { t } = useTranslation();
  const modal = {
    addingChannel: <Modal
      toastHandler={toastHandler}
      t={t}
      modalType={modalTypes.addingChannel}
    />,
    removingChannel: <Modal
      toastHandler={toastHandler}
      t={t}
      modalType={modalTypes.removingChannel}
    />,
    renamingChannel: <Modal
      toastHandler={toastHandler}
      t={t}
      modalType={modalTypes.renamingChannel}
    />,
  };
  return modal[type];
};
