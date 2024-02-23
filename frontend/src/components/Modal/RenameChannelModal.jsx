import { Form } from 'react-bootstrap';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useRollbar } from '@rollbar/react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ROUTES from '../../fetchApi/route.js';
import getAuthHeader from '../../utils/getAuthHeader.js';
import { isShownSelector, modalActions, getUpdatedChannelId } from '../../store/slices/modalSlice.js';
import { channelActions, channelsSelector } from '../../store/slices/channelsSlice.js';

const RenameChannelModal = ({ toastHandler }) => {
  const rollbar = useRollbar();
  const { t } = useTranslation();
  const inputEl = useRef(null);
  const channelNames = useSelector((state) => channelsSelector.selectAll(state))
    .map((channel) => channel.name);

  useEffect(() => {
    inputEl.current.focus();
    inputEl.current.select();
  }, []);

  const updatedChannelId = useSelector(getUpdatedChannelId);
  const updatedChanne = useSelector((state) => channelsSelector.selectAll(state))
    .find((channel) => channel.id === updatedChannelId);
  const isShownModal = useSelector((state) => isShownSelector(state));
  const dispatch = useDispatch();
  const hideModal = () => dispatch(modalActions.hideModal());

  const channelNameSchema = yup.object({
    nameInput: yup
      .string()
      .required('Обязательное поле')
      .min(3, 'Минимум 3')
      .max(20, 'Максимум 20')
      .notOneOf(channelNames, t('errorMessages.incorrectRenameChannel')),
  });

  const formik = useFormik({
    initialValues: {
      nameInput: updatedChanne.name,
    },
    validationSchema: channelNameSchema,
    onSubmit: async (values) => {
      const token = getAuthHeader();
      formik.setSubmitting(true);
      try {
        const newChannel = {
          name: values.nameInput,
        };
        const response = await axios
          .patch(ROUTES.updateChannelPath(updatedChannelId), newChannel, {
            headers: {
              Authorization: token.Authorization,
            },
          });
        hideModal();
        dispatch(channelActions.addChannel(response.data));
        dispatch(channelActions.switchChannel(response.data.id));
        toastHandler(true);
        formik.resetForm();
      } catch (e) {
        rollbar.error('Removing channel', e);
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
          {t('modalHeaders.renameModal')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3" id="exampleForm.ControlInput1">
            <Form.Label htmlFor="nameInput" className="visually-hidden" />
            <Form.Control
              type="text"
              name="nameInput"
              id="nameInput"
              onChange={formik.handleChange}
              value={formik.values.nameInput}
              isInvalid={!formik.isValid}
              ref={inputEl}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.nameInput}
            </Form.Control.Feedback>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="outline-secondary" onClick={hideModal} className="me-2 ">{t('buttons.cancelBtn')}</Button>
            <Button variant="secondary" type="submit">{t('buttons.sendBtn')}</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannelModal;
