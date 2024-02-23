import { Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useRollbar } from '@rollbar/react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import fetchRoutes from '../../fetchApi/route.js';
import getAuthHeader from '../../utils/getAuthHeader.js';
import { isShownSelector, modalActions, getUpdatedChannelId } from '../../store/slices/modalSlice.js';
import { channelActions } from '../../store/slices/channelsSlice.js';

const RemoveChannelModal = ({ toastHandler }) => {
  const [connectionError, setConnectionError] = useState(null);
  const rollbar = useRollbar();
  const { t } = useTranslation();
  const updatedChannelId = useSelector(getUpdatedChannelId);
  const isShownModal = useSelector((state) => isShownSelector(state));
  const dispatch = useDispatch();
  const hideModal = () => dispatch(modalActions.hideModal());

  const connectionErrorEl = (isConnetionErr) => {
    if (isConnetionErr) {
      return (
        <div className="sm text-danger">
          {t('errorMessages.incorrectSignup')}
        </div>
      );
    }
    return null;
  };

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: async () => {
      const token = getAuthHeader();
      formik.setSubmitting(true);
      try {
        await axios
          .delete(fetchRoutes.updateChannelPath(updatedChannelId), {
            headers: {
              Authorization: token.Authorization,
            },
          });
        hideModal();
        dispatch(channelActions.switchChannel(1));
        toastHandler(true);
        formik.resetForm();
      } catch (e) {
        rollbar.error('Removing channel', e);
        if (e.isAxiosError) {
          setConnectionError(t('fetchErrors.connectionError'));
        }
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
          {t('modalHeaders.removeModal')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          {t('questions.removeChannelQuestion')}
          <div className="d-flex justify-content-end">
            <Button variant="secondary" onClick={hideModal} className="me-2 ">{t('buttons.cancelBtn')}</Button>
            <Button variant="danger" type="submit">{t('buttons.deleteBtn')}</Button>
          </div>
          {connectionErrorEl(connectionError)}
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannelModal;
