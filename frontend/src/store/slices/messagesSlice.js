import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import fetchDataThunk from './fetchDataThunk.js';

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
    addMessages: messagesAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataThunk.fulfilled, (state, action) => {
        state.statusbar = statusName.loaded;
        state.errors = null;
        messagesAdapter.setAll(state, action.payload.data.messages);
      });
  },
});

export const { actions: messageActions } = messagesSlice;
export const messagesSelectors = messagesAdapter.getSelectors((state) => state.messages);
export default messagesSlice.reducer;
