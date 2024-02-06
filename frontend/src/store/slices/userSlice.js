import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
// import fetchDataThunk from './fetchDataThunk.js';

// const initialState = { userId: '' };
const usersAdapter = createEntityAdapter();
const userSlice = createSlice({
  name: 'user',
  initialState: usersAdapter.getInitialState(),
  reducers: {
    setUser: usersAdapter.addOne,
  },
});

export const useUserSelector = usersAdapter.getSelectors((state) => state.user);
export const { actions: userActions } = userSlice;
export default userSlice.reducer;
