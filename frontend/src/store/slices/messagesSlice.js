/* eslint-disable no-param-reassign */
import {
  createSlice, createEntityAdapter, createAsyncThunk, createSelector,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { fetchRoutes } from '../../routes.js';
import { channelActions } from './channelsSlice.js';

export const fetchMessagesThunk = createAsyncThunk(
  'messages/fetchMessages',
  async (header) => {
    const response = await axios.get(fetchRoutes.messagesPath(), { headers: header });
    return response.data;
  },
);

export const fetchMessage = createAsyncThunk(
  'messages/newMessage',
  async ({ header, newMessage }) => {
    await axios
      .post(fetchRoutes.messagesPath(), newMessage, { headers: header });
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
      .addCase(fetchMessagesThunk.rejected, (state, action) => {
        if (action.error.message
          && action.error.message === 'Network Error') {
          state.errors = 'networkErr';
        }
      })
      .addCase(fetchMessage.rejected, (state, action) => {
        if (action.error.message
          && action.error.message === 'Network Error') {
          state.errors = 'networkErr';
        }
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
export const getMessageErrors = (state) => state.messages.errors;
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
