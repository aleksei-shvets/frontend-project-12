import { Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ROUTES from '../fetchApi/route.js';
import getAuthHeader from '../utils/getAuthHeader.js';
import { isShownSelector, modalActions, getUpdatedChannelId } from '../store/slices/modalSlice.js';
import { channelActions } from '../store/slices/channelsSlice.js';
import store from '../store/index.js';

const RemoveChannelModal = () => {
  const updatedChannelId = useSelector(getUpdatedChannelId);
  const isShownModal = useSelector((state) => isShownSelector(state));
  const dispatch = useDispatch();
  const hideModal = () => dispatch(modalActions.hideModal());

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: async () => {
      const token = getAuthHeader();
      formik.setSubmitting(true);
      try {
        const response = await axios
          .delete(ROUTES.updateChannelPath(updatedChannelId), {
            headers: {
              Authorization: token.Authorization,
            },
          });
        console.log(response);
        hideModal();
        dispatch(channelActions.switchChannel(1));
        formik.resetForm();
        console.log(store.getState());
        return true;
      } catch (e) {
        console.log(e.message);
        return e;
      } finally {
        formik.setSubmitting(false);
      }
    },
  });

  return (
    <Modal
      size="lg"
      centered
      show={isShownModal}
      onHide={hideModal}
    >
      <Modal.Header closeButton>
        <Modal.Title id="nameInput">
          Удалить канал
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          Уверены?
          <div className="d-flex justify-content-end">
            <Button variant="secondary" onClick={hideModal} className="me-2 ">Отменить</Button>
            <Button variant="danger" type="submit">Удалить</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannelModal;
