import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';
// import Spinner from 'react-bootstrap/Spinner';
import ChannelsContainer from '../containers/ChannelsContainer.jsx';
import MessagesContainer from '../containers/MessagesContainer.jsx';
// import { channelsSelector, currentChannelIdSelector } from '../store/slices/channelsSlice.js';
import { fetchChannelsThunk } from '../store/slices/channelsSlice.js';
import { fetchMessagesThunk } from '../store/slices/messagesSlice.js';
import AddChannelModal from '../components/Modal.jsx';
// import store from '../store/index.js';
import { isShownSelector } from '../store/slices/modalSlice.js';

const Home = () => {
  const dispatch = useDispatch();
  const isShownModal = useSelector(isShownSelector);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchChannelsThunk());
      await dispatch(fetchMessagesThunk());
    };

    fetchData();
  }, [dispatch]);

  return (
    <div className="d-flex flex-column h-100">
      <Container className="h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
          <ChannelsContainer />
          <MessagesContainer />
        </div>
        {isShownModal ? <AddChannelModal /> : null}
      </Container>
    </div>
  );
};

export default Home;
