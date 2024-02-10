import { Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import useModal from '../hooks/useModal';
import ROUTES from '../fetchApi/route.js';
import getAuthHeader from '../utils/getAuthHeader';
import { isShownSelector, modalActions } from '../store/slices/modalSlice.js';

const AddChannelModal = () => {
  // const modalHook = useModal();
  const isShownModal = useSelector((state) => isShownSelector(state));
  const dispatch = useDispatch();
  const hideModal = () => dispatch(modalActions.hideModal());

  const formik = useFormik({
    initialValues: {
      nameInput: '',
    },
    onSubmit: async (values) => {
      const token = getAuthHeader();
      formik.setSubmitting(true);
      try {
        const newChannel = {
          name: values.nameInput,
        };
        const response = await axios
          .post(ROUTES.channelsPath(), newChannel, {
            headers: {
              Authorization: token.Authorization,
            },
          });
        // modalHook.hideModal();
        hideModal();
        formik.resetForm();
        console.log(response.data);
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
          Добавить канал
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3" id="exampleForm.ControlInput1">
            <Form.Label htmlFor="nameInput" className="visually-hidden" />
            <Form.Control
              type="text"
              name="nameInput"
              id="nameInput"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            <Form.Control.Feedback type="invalid" />
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="outline-secondary" onClick={hideModal} className="me-2 ">Отменить</Button>
            <Button variant="secondary" type="submit">Отправить</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddChannelModal;
