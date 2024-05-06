/* eslint-disable no-param-reassign */
import {
  createSlice, createEntityAdapter, createAsyncThunk,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { fetchRoutes } from '../../routes.js';
import defaultChannelId from '../../constants/constants.js';

const channelsAdapter = createEntityAdapter();

export const fetchChannelsThunk = createAsyncThunk(
  'channels/fetchChannels',
  async (header) => {
    try {
      const response = await axios.get(fetchRoutes.channelsPath(), { headers: header });
      return response.data;
    } catch (e) {
      return e;
    }
  },
);
const statusName = {
  loading: 'loading',
  loaded: 'loaded',
  failed: 'failed',
};

const initialState = channelsAdapter.getInitialState({
  currentChannelId: defaultChannelId,
  statusbar: null,
  errors: null,
});

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: channelsAdapter.addOne,
    removeChannel: channelsAdapter.removeOne,
    switchChannel: (state, action) => {
      state.currentChannelId = action.payload;
    },
    renameChannel: channelsAdapter.updateOne,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchChannelsThunk.pending, (state) => {
      state.statusbar = statusName.loading;
      state.errors = null;
    })
      .addCase(fetchChannelsThunk.fulfilled, (state, action) => {
        state.statusbar = statusName.loaded;
        state.errors = null;
        channelsAdapter.addMany(state, action.payload);
      })
      .addCase(fetchChannelsThunk.rejected, (state, action) => {
        state.statusbar = 'failed';
        state.errors = action.error;
      });
  },
});

export const currentChannelIdSelector = (state) => state.channels.currentChannelId;
export const { actions: channelActions } = channelsSlice;

export const baseChannelsSelectors = channelsAdapter.getSelectors((state) => state.channels);

export const currentChannel = (state) => {
  const { currentChannelId } = state.channels;
  return baseChannelsSelectors.selectById(state, currentChannelId);
};

export default channelsSlice.reducer;
