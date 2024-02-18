import { Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ROUTES from '../fetchApi/route.js';
import getAuthHeader from '../utils/getAuthHeader.js';
import { isShownSelector, modalActions, getUpdatedChannelId } from '../store/slices/modalSlice.js';
import { channelActions } from '../store/slices/channelsSlice.js';
import store from '../store/index.js';

const RemoveChannelModal = ({ toastHandler }) => {
  const { t } = useTranslation();
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
        await axios
          .delete(ROUTES.updateChannelPath(updatedChannelId), {
            headers: {
              Authorization: token.Authorization,
            },
          });
        hideModal();
        dispatch(channelActions.switchChannel(1));
        toastHandler(true);
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
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannelModal;
