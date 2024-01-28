// import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

/* import ROUTES from './route.jsx';
import useAuth from '../hooks/index.js';
import store from '../store/index.js';
import apiRoutes from '../api/route.js'; */
import getAuthHeader from '../utils/getAuthHeader.js';
import { useGetChannelsQuery } from '../store/services/channelsApi.js';

const Home = () => {
  const token = getAuthHeader();
  const [getChannels] = useGetChannelsQuery();
  const { data } = useGetChannelsQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getChannels(token));
    console.log(data);
  }, []);

  return (
    <div>
      <header>
        {data && (
          <div>
            {/* Здесь используйте данные */}
            {data.map((item) => (
              <div key={item.id}>{item.name}</div>
            ))}
          </div>
        )}
        <a
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

export default Home;
