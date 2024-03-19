import { DataFetchUser } from '../types/DataFetchUser';
import { ResponseResetPassword, ResponseUser } from '../types/ResponseUser';
import { client } from './fetchClient';

export const loginUser = (data: DataFetchUser) => {
  return client.post<ResponseUser>('/login', data);
};

export const passwordReset = (email: string) => {
  const data = {
    email,
    redirect_url: `${window.location.origin}/#/reset-password`,
  };

  return client.post<ResponseResetPassword>('/password-reset', data);
};
