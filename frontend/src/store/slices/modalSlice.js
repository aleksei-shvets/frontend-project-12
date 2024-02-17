import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isShown: false,
  type: null,
  updatedChannelId: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal: (state) => {
      state.isShown = true;
    },
    hideModal: (state) => {
      state.isShown = false;
    },
    setModalType: (state, action) => {
      state.type = action.payload;
    },
    setUpdatedChannelId: (state, action) => {
      state.updatedChannelId = action.payload;
    },
  },
});

export const isShownSelector = (state) => state.modal.isShown;
export const getModalTypeSelector = (state) => state.modal.type;
export const getUpdatedChannelId = (state) => state.modal.updatedChannelId;
export const { actions: modalActions } = modalSlice;
export default modalSlice.reducer;
