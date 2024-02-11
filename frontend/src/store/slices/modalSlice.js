import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isShown: false,
  type: null,
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
    setModalType: (state, modalType) => {
      state.type = modalType;
    },
  },
});

export const isShownSelector = (state) => state.modal.isShown;
export const detModalTypeSelector = (state) => state.modal.type;
export const { actions: modalActions } = modalSlice;
export default modalSlice.reducer;
