import { createSlice } from '@reduxjs/toolkit';

const initialState = { userId: '' };
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, actions) => {
      state.userId = actions.payload;
    },
  },
});

export const getUserIdSelector = (state) => state.user.userId;
export const { setUser } = userSlice.actions;
export default userSlice.reducer;
