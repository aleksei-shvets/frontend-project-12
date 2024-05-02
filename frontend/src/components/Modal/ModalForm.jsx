import { Form, InputGroup } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { useRollbar } from '@rollbar/react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { fetchRoutes } from '../../routes.js';
import { channelActions } from '../../store/slices/channelsSlice.js';
import getShema from '../../validation/validation.js';
import defaultChannelId from '../../constants/constants.js';
import useAuth from '../../hooks/useAuth.js';
import useProfanity from '../../hooks/useProfanity.js';
import { channelSelectors, modalSelectors } from '../../store/slices/selectors.js';

const addNewChannel = async ({ inputValue, token, dispatch }) => {
  const response = await axios.post(fetchRoutes.channelsPath(), { name: inputValue }, {
    headers: {
      Authorization: token.Authorization,
    },
  });
  dispatch(channelActions.addChannel(response.data));
  dispatch(channelActions.switchChannel(response.data.id));
};

const renameChannel = async ({ updatedChannelId, inputValue, token }) => {
  await axios.patch(fetchRoutes.updateChannelPath(updatedChannelId), { name: inputValue }, {
    headers: {
      Authorization: token.Authorization,
    },
  });
};

const deleteChannel = async (deletedChannelId, authToken, dispatcher) => {
  await axios
    .delete(fetchRoutes.updateChannelPath(deletedChannelId), {
      headers: {
        Authorization: authToken.Authorization,
      },
    });
  dispatcher(channelActions.switchChannel(defaultChannelId));
};

const getDataFetch = (type) => {
  const modalTypes = {
    addingChannel: addNewChannel,
    renamingChannel: renameChannel,
  };
  return modalTypes[type];
};

const ModalForm = ({
  toastHandler, modalType, t, hideModal, dispatch,
}) => {
  const authHook = useAuth();
  const token = authHook.getAuthHeader();
  const [connectionError, setConnectionError] = useState(null);
  const rollbar = useRollbar();
  const profanity = useProfanity();
  const wordsFilter = (message) => profanity(message);

  const inputEl = useRef(null);
  useEffect(() => {
    if (modalType !== 'removingChannel') {
      inputEl.current.focus();
      inputEl.current.select();
    }
  }, [modalType]);

  const channelNames = useSelector(channelSelectors.selectAll)
    .map((channel) => channel.name);

  const { channelNameSchema } = getShema(t, channelNames);

  const updatedChannelId = useSelector(modalSelectors.getUpdatedChannelId);

  const updatedChannel = useSelector(channelSelectors.selectAll)
    .find((channel) => channel.id === updatedChannelId);

  const nameInitValue = () => (modalType === 'renamingChannel' ? updatedChannel.name : '');

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
    onSubmit: (values) => {
      const filtredValue = wordsFilter(values.nameInput);
      formik.setSubmitting(true);
      try {
        getDataFetch(modalType)({
          token, updatedChannelId, dispatch, inputValue: filtredValue,
        });
        hideModal();
        toastHandler(true);
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

  if (modalType !== 'removingChannel') {
    return (
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3" id="exampleForm.ControlInput1">
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
            <Form.Label htmlFor="nameInput" className="visually-hidden">{t('placeholders.channelsModalLabel')}</Form.Label>
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
  }
  return (
    <Form onSubmit={formik.handleSubmit}>
      {t('questions.removeChannelQuestion')}
      <div className="d-flex justify-content-end">
        <Button variant="secondary" onClick={hideModal} className="me-2 ">{t('buttons.cancelBtn')}</Button>
        <Button
          variant="danger"
          onClick={(e) => {
            e.preventDefault();
            deleteChannel(updatedChannelId, token, dispatch);
            hideModal();
            toastHandler(true);
          }}
          type="button"
        >
          {t('buttons.deleteBtn')}
        </Button>
      </div>
      {connectionErrorEl(connectionError)}
    </Form>
  );
};

export default ModalForm;
