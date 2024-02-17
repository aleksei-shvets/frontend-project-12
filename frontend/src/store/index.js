import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from '../slices/channelsSlice.js';
import messagesReducer from '../slices/messagesSlice.js';
import userReducer from '../slices/userSlice.js';
import modalReducer from '../slices/modalSlice.js';

export default configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
    user: userReducer,
    modal: modalReducer,
  },
});
