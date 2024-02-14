import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';
// import Spinner from 'react-bootstrap/Spinner';
import ChannelsContainer from '../containers/ChannelsContainer.jsx';
import MessagesContainer from '../containers/MessagesContainer.jsx';
// import { channelsSelector, currentChannelIdSelector } from '../store/slices/channelsSlice.js';
import { fetchChannelsThunk } from '../store/slices/channelsSlice.js';
import { fetchMessagesThunk } from '../store/slices/messagesSlice.js';
import ModalItem from '../components/Modal.jsx';
// import store from '../store/index.js';
import { isShownSelector, getModalTypeSelector } from '../store/slices/modalSlice.js';

const Home = () => {
  const dispatch = useDispatch();
  const isShownModal = useSelector(isShownSelector);
  const modalType = useSelector(getModalTypeSelector);
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
      {isShownModal ? <ModalItem type={modalType} /> : null}
    </Container>
  );
};

export default Home;
