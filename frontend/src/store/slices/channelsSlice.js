import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import fetchDataThunk from './fetchDataThunk.js';

const channelsAdapter = createEntityAdapter();

const statusName = {
  loading: 'loading',
  loaded: 'loaded',
  notloaded: 'notloaded',
};

const initialState = channelsAdapter.getInitialState({
  currentChannelId: 1,
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
        state.errors = null;
        channelsAdapter.setAll(state, action.payload.channels);
      })
      .addCase(fetchDataThunk.rejected, (state, action) => {
        state.statusbar = 'failed';
        state.errors = action.error;
      });
  },
});

export const { actions } = channelsSlice;
export const channelsSelector = channelsAdapter.getSelectors((state) => state.channels);

export default channelsSlice.reducer;
