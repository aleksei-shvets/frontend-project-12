import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import { isShownSelector, modalActions } from '../../store/slices/modalSlice.js';

const ModalContainer = () => {
  const isShownModal = useSelector((state) => isShownSelector(state));
  const dispatch = useDispatch();
  const hideModal = () => dispatch(modalActions.hideModal());

  return (
    <Modal
      size="lg"
      centered
      show={isShownModal}
      onHide={hideModal}
    />
  );
};

export default ModalContainer;
