import { configureStore } from '@reduxjs/toolkit';
import channelsApi from './services/channelsApi.js';

export default configureStore({
  reducer: {
    [channelsApi.reducerPath]: channelsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(channelsApi.middleware),
});
