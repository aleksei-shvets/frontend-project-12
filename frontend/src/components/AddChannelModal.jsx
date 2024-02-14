import { Form } from 'react-bootstrap';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ROUTES from '../fetchApi/route.js';
import getAuthHeader from '../utils/getAuthHeader.js';
import { isShownSelector, modalActions } from '../store/slices/modalSlice.js';
import { channelActions, channelsSelector } from '../store/slices/channelsSlice.js';
import store from '../store/index.js';

/* const modalTypes = {
  addingChannel: 'addingChannel',
  removingChannel: 'removingChannel',
  renamingChannel: 'renamingChannel',
}; */

const AddChannelModal = () => {
  const channelNames = useSelector((state) => channelsSelector.selectAll(state))
    .map((channel) => channel.name);
  const channelNameSchema = yup.object({
    nameInput: yup
      .string()
      .required('Обязательное поле')
      .min(3, 'Минимум 3')
      .max(20, 'Максимум 20')
      .notOneOf(channelNames),
  });

  const isShownModal = useSelector((state) => isShownSelector(state));
  const dispatch = useDispatch();
  const hideModal = () => dispatch(modalActions.hideModal());

  const formik = useFormik({
    initialValues: {
      nameInput: '',
    },
    validationSchema: channelNameSchema,
    onSubmit: async (values) => {
      const token = getAuthHeader();
      formik.setSubmitting(true);
      try {
        const newChannel = {
          name: values.nameInput,
        };
        console.log(store.getState());
        const response = await axios
          .post(ROUTES.channelsPath(), newChannel, {
            headers: {
              Authorization: token.Authorization,
            },
          });
        console.log(response);
        hideModal();
        dispatch(channelActions.addChannel(response.data));
        dispatch(channelActions.switchChannel(response.data.id));
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
              value={formik.values.nameInput}
              isInvalid={!formik.isValid}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.nameInput}
            </Form.Control.Feedback>
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
