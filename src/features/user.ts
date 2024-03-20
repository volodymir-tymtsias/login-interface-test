/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loginUser, passwordReset, setNewPassword } from '../api/user';
import { DataFetchUser } from '../types/DataFetchUser';
import { DataFetchNewPassword } from '../types/DataFetchNewPassword';
import { Detail } from '../types/ResponseUser';

type UserState = {
  accessToken: string;
  refreshToken: string;
  error: Detail;
  loading: boolean;
  resetSentToMail: boolean;
  newPasswordHasBeenSet: boolean;
};

const initialState: UserState = {
  accessToken: '',
  refreshToken: '',
  error: '',
  loading: false,
  resetSentToMail: false,
  newPasswordHasBeenSet: false,
};

export const initUser = createAsyncThunk(
  'user/login',
  (data: DataFetchUser) => loginUser(data),
);

export const userPasswordReset = createAsyncThunk(
  'user/reset-password',
  (data: string) => passwordReset(data),
);

export const userSetNewPassword = createAsyncThunk(
  'user/set-new-password',
  (data: DataFetchNewPassword) => setNewPassword(data),
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = '';
    },
    deleteResetSentToMail: (state) => {
      state.resetSentToMail = false;
    },
    deleteNewPasswordHasBeenSet: (state) => {
      state.newPasswordHasBeenSet = false;
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

    builder.addCase(userSetNewPassword.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(userSetNewPassword.fulfilled, (state, action) => {
      if (!action.payload.error) {
        state.newPasswordHasBeenSet = true;
      } else {
        state.error = action.payload.detail;
      }
      state.loading = false;
    });

    builder.addCase(userSetNewPassword.rejected, (state) => {
      state.error = 'Something wrong';
      state.loading = false;
    });
  },
});

export default userSlice.reducer;
export const { 
  logout, 
  clearError, 
  deleteResetSentToMail, 
  deleteNewPasswordHasBeenSet,
} = userSlice.actions;
