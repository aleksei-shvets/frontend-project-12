import { useTranslation } from 'react-i18next';
import Modal from 'react-bootstrap/Modal';
import ModalForm from './ModalForm.jsx';
import ModalContainer from './ModalContainer.jsx';

const typePrope = 'addingChannel';

const AddChannelModal = ({ toastHandler }) => {
  const { t } = useTranslation();

  return (
    <ModalContainer>
      <Modal.Header closeButton>
        <Modal.Title id="nameInput">
          {t('modalHeaders.addModal')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ModalForm toastHandler={toastHandler} modalType={typePrope} />
      </Modal.Body>
    </ModalContainer>
  );
};

export default AddChannelModal;
