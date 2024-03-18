/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loginUser } from '../api/user';
import { DataFetchUser } from '../types/DataFetchUser';

type UserState = {
  accessToken: string;
  refreshToken: string;
  error: any[] | string | number;
  loading: boolean;
};

const initialState: UserState = {
  accessToken: '',
  refreshToken: '',
  error: '',
  loading: false,
};

export const initUser = createAsyncThunk(
  'user/fetch',
  (data: DataFetchUser) => loginUser(data),
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = '';
    },
    logout: (state) => {
      state.accessToken = '';
      state.refreshToken = '';
      state.error = '';
      state.loading = false;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.setItem('isAuth', 'false');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initUser.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(initUser.fulfilled, (state, action) => {
      if (!action.payload.error) {
        state.accessToken = action.payload.access_token;
        state.refreshToken = action.payload.refresh_token;
        localStorage.setItem('accessToken', action.payload.access_token);
        localStorage.setItem('refreshToken', action.payload.refresh_token);
        localStorage.setItem('isAuth', 'true');
      } else {
        state.error = action.payload.detail;
      }
      state.loading = false;
    });

    builder.addCase(initUser.rejected, (state) => {
      state.error = 'Something wrong';
      state.loading = false;
    });
  },
});

export default userSlice.reducer;
export const { logout, clearError } = userSlice.actions;
