import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container } from 'react-bootstrap';
// import Spinner from 'react-bootstrap/Spinner';
import ChannelsContainer from '../containers/ChannelsContainer.jsx';
import MessagesContainer from '../containers/MessagesContainer.jsx';
// import { channelsSelector, currentChannelIdSelector } from '../store/slices/channelsSlice.js';
import fetchDataThunk from '../store/slices/fetchDataThunk.js';
// import store from '../store/index.js';

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchDataThunk());
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
      </Container>
    </div>
  );
};

export default Home;
