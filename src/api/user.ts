import { DataFetchUser } from '../types/DataFetchUser';
import { ResponseUser } from '../types/ResponseUser';
import { client } from './fetchClient';

export const loginUser = (data: DataFetchUser) => {
  const newData = {
    email: data.email,
    password: data.password,
  };

  return client.post<ResponseUser>('/login', newData);
};
