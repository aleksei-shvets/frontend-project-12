import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import fetchDataThunk from './fetchDataThunk.js';

const channelsAdapter = createEntityAdapter();

const defaultChannelId = 1;
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
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDataThunk.pending, (state) => {
      state.statusbar = statusName.loading;
      state.errors = null;
    })
      .addCase(fetchDataThunk.fulfilled, (state, action) => {
        state.statusbar = statusName.loaded;
        state.currentChannelId = action.payload.data.currentChannelId;
        state.errors = null;
        channelsAdapter.setAll(state, action.payload.data.channels);
      })
      .addCase(fetchDataThunk.rejected, (state, action) => {
        state.statusbar = 'failed';
        state.errors = action.error;
      });
  },
});

export const statusbarSelector = (state) => state.channels.statusbar;
export const currentChannelIdSelector = (state) => state.channels.currentChannelId;
export const getChannelsSelector = (state) => state.channels.enteties;
export const { actions } = channelsSlice;
export const channelsSelector = channelsAdapter.getSelectors((state) => state.channels);

export default channelsSlice.reducer;
