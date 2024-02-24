import Modal from 'react-bootstrap/Modal';
import ModalForm from './ModalForm.jsx';
import ModalBox from './ModalBox.jsx';

const typePrope = 'renamingChannel';

const RenameChannelModal = ({ toastHandler, t }) => (
  <ModalBox>
    <Modal.Header closeButton>
      <Modal.Title id="nameInput">
        {t('modalHeaders.renameModal')}
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <ModalForm toastHandler={toastHandler} modalType={typePrope} />
    </Modal.Body>
  </ModalBox>
);

export default RenameChannelModal;
