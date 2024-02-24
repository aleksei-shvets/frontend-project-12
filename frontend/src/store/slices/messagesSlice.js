import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
// import { useRollbar } from '@rollbar/react';
import axios from 'axios';
import getAuthHeader from '../../utils/getAuthHeader.js';
import fetchRoutes from '../../fetchApi/route.js';
import { channelActions } from './channelsSlice.js';

// const rollbar = useRollbar();

export const fetchMessagesThunk = createAsyncThunk(
  'messages/fetchMessages',
  async () => {
    try {
      const token = getAuthHeader();
      const response = await axios.get(fetchRoutes.messagesPath(), { headers: token });
      return response;
    } catch (e) {
      // rollbar.error('Fetching messages', e);
      return e;
    }
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
      })
      .addCase(channelActions.removeChannel, (state, action) => {
        const removedChannelId = action.payload;
        const filtredMessages = Object.values(state.entities)
          .filter((message) => message.channelId !== removedChannelId);
        messagesAdapter.setAll(state, filtredMessages);
      });
  },
});

export const { actions: messageActions } = messagesSlice;
export const messagesSelectors = messagesAdapter.getSelectors((state) => state.messages);
export default messagesSlice.reducer;
