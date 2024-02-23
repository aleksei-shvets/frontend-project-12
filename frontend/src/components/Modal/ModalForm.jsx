import { Form, InputGroup } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRollbar } from '@rollbar/react';
import * as filterProfanity from 'leo-profanity';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import fetchRoutes from '../../fetchApi/route.js';
import getAuthHeader from '../../utils/getAuthHeader.js';
import { modalActions, getUpdatedChannelId } from '../../store/slices/modalSlice.js';
import { channelActions, channelsSelector } from '../../store/slices/channelsSlice.js';
import getShema from '../../validation/validation.js';

const ModalForm = ({ toastHandler, modalType }) => {
  const [connectionError, setConnectionError] = useState(null);
  const rollbar = useRollbar();
  filterProfanity.loadDictionary('ru');
  const wordsFilter = (message) => filterProfanity.clean(message);
  const { t } = useTranslation();

  const channelNames = useSelector((state) => channelsSelector.selectAll(state))
    .map((channel) => channel.name);

  const { channelNameSchema } = getShema(t, channelNames);

  const updatedChannelId = useSelector(getUpdatedChannelId);
  const updatedChannel = useSelector((state) => channelsSelector.selectAll(state))
    .find((channel) => channel.id === updatedChannelId);
  const nameInitValue = () => {
    if (modalType === 'renamingChannel') {
      return updatedChannel.name;
    }
    return '';
  };

  const inputEl = useRef(null);
  useEffect(() => {
    inputEl.current.focus();
    if (inputEl.current.value !== '') {
      inputEl.current.select();
    }
  }, []);

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
      nameInput: nameInitValue(),
    },
    validationSchema: channelNameSchema,
    onSubmit: async (values) => {
      const token = getAuthHeader();
      const channelName = wordsFilter(values.nameInput);
      formik.setSubmitting(true);
      try {
        const newChannel = {
          name: channelName,
        };
        const response = await axios
          .post(fetchRoutes.channelsPath(), newChannel, {
            headers: {
              Authorization: token.Authorization,
            },
          });
        hideModal();
        toastHandler(true);
        dispatch(channelActions.addChannel(response.data));
        dispatch(channelActions.switchChannel(response.data.id));
        formik.resetForm();
      } catch (e) {
        if (e.isAxiosError) {
          setConnectionError(t('fetchErrors.connectionError'));
          rollbar.error('Adding channel', e);
        }
        rollbar.error('Connection error', e);
      } finally {
        formik.setSubmitting(false);
      }
    },
  });
  console.log(formik.values.nameInput);
  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group className="mb-3" id="exampleForm.ControlInput1">
        <Form.Label htmlFor="nameInput" className="visually-hidden" />
        <InputGroup hasValidation>
          <Form.Control
            type="text"
            name="nameInput"
            id="nameInput"
            onChange={formik.handleChange}
            value={formik.values.nameInput}
            isInvalid={!formik.isValid}
            ref={inputEl}
          />
          <Form.Control.Feedback tooltip type="invalid">
            {formik.errors.nameInput}
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>
      <div className="d-flex justify-content-end">
        <Button variant="outline-secondary" onClick={hideModal} className="me-2 ">{t('buttons.cancelBtn')}</Button>
        <Button variant="secondary" type="submit">{t('buttons.sendBtn')}</Button>
      </div>
      {connectionErrorEl(connectionError)}
    </Form>
  );
};

export default ModalForm;
