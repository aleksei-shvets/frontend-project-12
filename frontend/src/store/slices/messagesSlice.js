/* eslint-disable no-param-reassign */
import {
  createSlice, createEntityAdapter, createAsyncThunk, createSelector,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { fetchRoutes } from '../../routes.js';
import { channelActions } from './channelsSlice.js';

export const fetchMessagesThunk = createAsyncThunk(
  'messages/fetchMessages',
  async () => {
    try {
      const userToken = JSON.parse(localStorage.getItem('userToken'));
      const token = { Authorization: `Bearer ${userToken}` };
      const response = await axios.get(fetchRoutes.messagesPath(), { headers: token });
      return response.data;
    } catch (e) {
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
        messagesAdapter.addMany(state, action.payload);
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
export const baseMessagesSelectors = messagesAdapter.getSelectors((state) => state.messages);

export const filtredMessages = createSelector(
  (state) => state,
  (state) => {
    const { currentChannelId } = state.channels;
    const messages = baseMessagesSelectors.selectAll(state);
    return messages
      .filter((message) => Number(message.channelId) === Number(currentChannelId));
  },
);

export default messagesSlice.reducer;
