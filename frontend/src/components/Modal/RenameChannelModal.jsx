import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Modal from 'react-bootstrap/Modal';
import { isShownSelector, modalActions } from '../../store/slices/modalSlice.js';
import ModalForm from './ModalForm.jsx';

const typePrope = 'renamingChannel';

const RenameChannelModal = ({ toastHandler }) => {
  const { t } = useTranslation();
  const isShownModal = useSelector((state) => isShownSelector(state));
  const dispatch = useDispatch();
  const hideModal = () => dispatch(modalActions.hideModal());

  return (
    <Modal
      size="lg"
      centered
      show={isShownModal}
      onHide={hideModal}
    >
      <Modal.Header closeButton>
        <Modal.Title id="nameInput">
          {t('modalHeaders.renameModal')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ModalForm toastHandler={toastHandler} modalType={typePrope} />
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannelModal;
