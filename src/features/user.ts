/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loginUser, passwordReset } from '../api/user';
import { DataFetchUser } from '../types/DataFetchUser';

type UserState = {
  accessToken: string;
  refreshToken: string;
  error: any[] | string | number;
  loading: boolean;
  resetSentToMail: boolean;
};

const initialState: UserState = {
  accessToken: '',
  refreshToken: '',
  error: '',
  loading: false,
  resetSentToMail: false,
};

export const initUser = createAsyncThunk(
  'user/login',
  (data: DataFetchUser) => loginUser(data),
);

export const userPasswordReset = createAsyncThunk(
  'user/reset-password',
  (data: string) => passwordReset(data),
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = '';
    },
    clearResetSentToMail: (state) => {
      state.resetSentToMail = false;
    },
    logout: (state) => {
      state.accessToken = '';
      state.refreshToken = '';
      state.error = '';
      state.loading = false;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
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
      } else {
        state.error = action.payload.detail;
      }
      state.loading = false;
    });

    builder.addCase(initUser.rejected, (state) => {
      state.error = 'Something wrong';
      state.loading = false;
    });

    builder.addCase(userPasswordReset.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(userPasswordReset.fulfilled, (state, action) => {
      if (!action.payload.error) {
        state.resetSentToMail = true;
      } else {
        state.error = action.payload.detail;
      }
      state.loading = false;
    });

    builder.addCase(userPasswordReset.rejected, (state) => {
      state.error = 'Something wrong';
      state.loading = false;
    });
  },
});

export default userSlice.reducer;
export const { logout, clearError, clearResetSentToMail } = userSlice.actions;
