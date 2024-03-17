/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loginUser } from '../api/user';

type UserState = {
  email: string;
  password: string;
  accessToken: string;
  refreshToken: string;
  error: string;
  loaded: boolean;
};

const initialState: UserState = {
  email: '',
  password: '',
  accessToken: '',
  refreshToken: '',
  error: '',
  loaded: false,
};

export const initUser = createAsyncThunk(
  'user/fetch',
  () => loginUser(),
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.email = '';
      state.password = '';
      state.accessToken = '';
      state.refreshToken = '';
      state.error = '';
      state.loaded = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initUser.pending, (state) => {
      state.loaded = false;
    });

    builder.addCase(initUser.fulfilled, (state, action) => {
            
      state.loaded = true;
    });

    builder.addCase(initUser.rejected, (state) => {
      state.error = 'something wrong';
      state.loaded = true;
    });
  },
});

export default userSlice.reducer;
export const { logout } = userSlice.actions;
