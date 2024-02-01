// import axios from 'axios';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container } from 'react-bootstrap';
/* import ROUTES from './route.jsx';
import useAuth from '../hooks/index.js';
import store from '../store/index.js';
import apiRoutes from '../api/route.js'; */
// import getAuthHeader from '../utils/getAuthHeader.js';
import ChannelsContainer from '../containers/ChannelsContainer.jsx';
import MessagesContainer from '../containers/MessagesContainer.jsx';
import { channelsSelector } from '../store/slices/channelsSlice.js';
import fetchDataThunk from '../store/slices/fetchDataThunk.js';

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchDataThunk());
      } catch (error) {
        console.error('Error fetching channels:', error);
      }
    };

    fetchData();
  }, [dispatch]);
  const ch = useSelector(channelsSelector.selectAll);
  console.log(ch);
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
