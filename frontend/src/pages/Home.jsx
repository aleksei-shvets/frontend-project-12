import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import 'react-toastify/dist/ReactToastify.css';
import ChannelsContainer from '../containers/ChannelsContainer.jsx';
import MessagesContainer from '../containers/MessagesContainer.jsx';
// import { channelsSelector, currentChannelIdSelector } from '../store/slices/channelsSlice.js';
import { fetchChannelsThunk } from '../store/slices/channelsSlice.js';
import { fetchMessagesThunk } from '../store/slices/messagesSlice.js';
import ModalItem from '../components/Modal.jsx';
// import store from '../store/index.js';
import { isShownSelector, getModalTypeSelector } from '../store/slices/modalSlice.js';

const Home = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isShownModal = useSelector(isShownSelector);
  const modalType = useSelector(getModalTypeSelector);
  const [isToast, setIsToast] = useState(false);

  const notifyMessage = {
    addingChannel: t('toastMessage.addChannel'),
    removingChannel: t('toastMessage.removeChannel'),
    renamingChannel: t('toastMessage.renameChannel'),
  };
  if (isToast) {
    console.log(isToast);
  }

  useEffect(() => {
    const notify = (message) => {
      toast.success(message, {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    };
    if (isToast) {
      notify(notifyMessage[modalType]);
      setIsToast(false);
    }
  }, [isToast]);
  // console.log(store.getState());

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchChannelsThunk());
      await dispatch(fetchMessagesThunk());
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
