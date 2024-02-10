import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import ROUTES from '../fetchApi/route.js';
import getAuthHeader from '../utils/getAuthHeader';
import { getUserIdSelector } from '../store/slices/userSlice.js';
import { CurrentUserMessage, OtherUsersMessage } from './MessageItem.jsx';
// import store from '../store/index.js';

const MessagesList = ({ messages, currentChannelId }) => {
  const username = useSelector(getUserIdSelector);
  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: async (values) => {
      const token = getAuthHeader();
      formik.setSubmitting(true);
      try {
        const newMessage = {
          body: values.message,
          channelId: currentChannelId,
          username,
        };
        const response = await axios
          .post(ROUTES.messagesPath(), newMessage, { headers: token });
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
    <>
      <div id="messages-box" className="chat-messages overflow-auto px-5 ">
        {messages.map((item) => (
          item.username === username
            ? <CurrentUserMessage key={item.id} item={item} />
            : <OtherUsersMessage key={item.id} item={item} />
        ))}
      </div>
      <div className="mt-auto px-5 py-3">
        <Form onSubmit={formik.handleSubmit} className="py-1 border rounded-2">
          <div className="input-group has-validation">
            <input
              onChange={formik.handleChange}
              name="message"
              aria-label="Новое сообщение"
              placeholder="Введите сообщение..."
              className="border-0 p-0 ps-2 form-control"
              value={formik.values.message}
            />
            <button type="submit" className="btn btn-group-vertical">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                <path d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
              </svg>
              <span className="visually-hidden">Отправить</span>
            </button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default MessagesList;
