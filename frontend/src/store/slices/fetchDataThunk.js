import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import getAuthHeader from '../../utils/getAuthHeader.js';
import ROUTES from '../../fetchApi/route.js';

const fetchDataThunk = createAsyncThunk(
  'channels/fetchChannels',
  async () => {
    const response = await axios.get(ROUTES.dataPath(), { headers: getAuthHeader() });
    return response;
  },
);

export default fetchDataThunk;
