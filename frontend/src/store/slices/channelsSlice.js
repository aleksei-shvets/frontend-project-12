/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import fetchRoutes from '../../fetchApi/route.js';
import defaultChannelId from '../../constants/constants.js';

const channelsAdapter = createEntityAdapter();

export const fetchChannelsThunk = createAsyncThunk(
  'channels/fetchChannels',
  async () => {
    try {
      const userToken = JSON.parse(localStorage.getItem('userToken'));
      const token = { Authorization: `Bearer ${userToken}` };
      const response = await axios.get(fetchRoutes.channelsPath(), { headers: token });
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

export default channelsSlice.reducer;
