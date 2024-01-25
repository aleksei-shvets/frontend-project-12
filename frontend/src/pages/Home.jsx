import axios from 'axios';
import React, { useEffect, useState } from 'react';

import ROUTES from './route.jsx';
import useAuth from '../hooks/index.js';

const getAuthHeader = () => {
  const userToken = JSON.parse(localStorage.getItem('userToken'));

  if (userToken && userToken.token) {
    return { Authorization: `Bearer ${userToken.token}` };
  }

  return {};
};

const Home = () => {

  
  return (
    <div>
      <header>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
};

export default Home;
