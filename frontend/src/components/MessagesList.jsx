import { useFormik } from 'formik';
import filter from 'leo-profanity';
import { useEffect, useRef } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useRollbar } from '@rollbar/react';
import Form from 'react-bootstrap/Form';
import { InputGroup } from 'react-bootstrap';
import fetchRoutes from '../fetchApi/route.js';
import getAuthHeader from '../utils/getAuthHeader';
import useAuth from '../hooks/useAuth.js';
import MessageItem from './MessageItem.jsx';

const fetchMessage = async (newMessage) => {
  const token = getAuthHeader();
  await axios
    .post(fetchRoutes.messagesPath(), newMessage, { headers: token });
};

const MessagesList = ({ messages, currentChannelId }) => {
  filter.loadDictionary('en');
  filter.add(filter.getDictionary('ru'));
  const rollbar = useRollbar();
  const wordsFilter = (message) => filter.clean(message);
  const { t } = useTranslation();
  const inputEl = useRef(null);
  const listRef = useRef(null);
  useEffect(() => {
    inputEl.current.focus();
  }, [currentChannelId]);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTo(0, listRef.current.scrollHeight);
    }
  }, [messages]);

  const authHook = useAuth();
  const userName = authHook.username;
  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: (values) => {
      formik.setSubmitting(true);
      try {
        const newMessage = {
          body: wordsFilter(values.message),
          channelId: currentChannelId,
          username: userName,
        };
        fetchMessage(newMessage);
        formik.resetForm();
      } catch (e) {
        rollbar.error('Adding message', e);
      } finally {
        formik.setSubmitting(false);
      }
    },
  });
  return (
    <>
      <div ref={listRef} id="messages-box" className="chat-messages overflow-auto px-5 ">
        {messages.map((item) => (
          item.username === userName
            ? <MessageItem key={item.id} item={item} userType="CurrentUserMessage" />
            : <MessageItem key={item.id} item={item} userType="OtherUsersMessage" />
        ))}
      </div>
      <div className="mt-auto px-5 py-3">
        <Form
          onSubmit={formik.handleSubmit}
          className="py-1 border rounded-2"
        >
          <InputGroup hasValidation className="input-group">
            <Form.Control
              required
              aria-label={t('placeholders.newMessage')}
              onChange={formik.handleChange}
              name="message"
              placeholder={t('placeholders.messageInput')}
              className="border-0 p-0 ps-2"
              value={formik.values.message}
              ref={inputEl}
            />
            <button
              type="submit"
              className="btn btn-group-vertical"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                <path d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
              </svg>
              <span className="visually-hidden">{t('buttons.sendBtn')}</span>
            </button>
          </InputGroup>
        </Form>
      </div>
    </>
  );
};

export default MessagesList;
