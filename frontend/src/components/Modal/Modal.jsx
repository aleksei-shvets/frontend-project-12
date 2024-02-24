import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import { isShownSelector, modalActions } from '../../store/slices/modalSlice.js';
import ModalForm from './ModalForm.jsx';

const ModalComponent = ({ t, modalType, toastHandler }) => {
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
        <Modal.Title id={modalType}>
          {t(`modalHeaders.${modalType}`)}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ModalForm
          t={t}
          toastHandler={toastHandler}
          modalType={modalType}
          hideModal={hideModal}
          dispatch={dispatch}
        />
      </Modal.Body>
    </Modal>
  );
};

export default ModalComponent;
