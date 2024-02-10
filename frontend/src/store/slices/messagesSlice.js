import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import getAuthHeader from '../../utils/getAuthHeader.js';
import ROUTES from '../../fetchApi/route.js';

export const fetchMessagesThunk = createAsyncThunk(
  'messages/fetchMessages',
  async () => {
    const token = getAuthHeader();
    const response = await axios.get(ROUTES.messagesPath(), { headers: token });
    return response;
  },
);

const messagesAdapter = createEntityAdapter();

const statusName = {
  loading: 'loading',
  loaded: 'loaded',
  failed: 'failed',
};

const initialState = messagesAdapter.getInitialState({
  statusbar: null,
  errors: null,
});

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: messagesAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessagesThunk.fulfilled, (state, action) => {
        state.statusbar = statusName.loaded;
        state.errors = null;
        messagesAdapter.addMany(state, action.payload.data);
      });
  },
});

export const { actions: messageActions } = messagesSlice;
export const messagesSelectors = messagesAdapter.getSelectors((state) => state.messages);
export default messagesSlice.reducer;
