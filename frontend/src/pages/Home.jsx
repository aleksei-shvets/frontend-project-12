import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import 'react-toastify/dist/ReactToastify.css';
import ChannelsContainer from '../containers/ChannelsContainer.jsx';
import MessagesContainer from '../containers/MessagesContainer.jsx';
import { fetchChannelsThunk } from '../store/slices/channelsSlice.js';
import { fetchMessagesThunk } from '../store/slices/messagesSlice.js';
import ModalItem from '../components/Modal/index.js';
import notify from '../components/notify.js';
import { modalSelectors, channelSelectors, messageSelectors } from '../store/slices/selectors.js';
import useAuth from '../hooks/useAuth.js';

const Home = () => {
  const authHook = useAuth();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isShownModal = useSelector(modalSelectors.isShownSelector);
  const modalType = useSelector(modalSelectors.getModalTypeSelector);
  const [isToast, setIsToast] = useState(false);

  const channelErrors = useSelector(channelSelectors.getChannelErrors);
  const messageErrors = useSelector(messageSelectors.getMessageErrors);

  const header = authHook.getAuthHeader();

  const notifyMessage = {
    addingChannel: t('toastMessage.addChannel'),
    removingChannel: t('toastMessage.removeChannel'),
    renamingChannel: t('toastMessage.renameChannel'),
  };

  useEffect(() => {
    if (isToast) {
      notify(notifyMessage[modalType], 'success');
      setIsToast(false);
    }
  }, [isToast, modalType]);

  useEffect(() => {
    const errMessage = t('fetchErrors.connectionError');
    if (channelErrors === 'networkErr' || messageErrors === 'networkErr') {
      notify(errMessage, 'error');
    }
  }, [messageErrors, channelErrors]);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchChannelsThunk(header));
      await dispatch(fetchMessagesThunk(header));
    };

    fetchData();
  }, [dispatch]);

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <ChannelsContainer />
        <MessagesContainer />
      </div>
      {isShownModal ? <ModalItem type={modalType} toastHandler={setIsToast} /> : null}
    </Container>
  );
};

export default Home;
