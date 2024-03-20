export type DetailError = {
  field_name: string;
  error: string;
};

export type Detail = string | number | DetailError[];

export interface ResponseUser {
  error: number;
  detail: Detail;
  timestamp: number;
  access_token: string;
  refresh_token: string;
  token_expire: number;
  refresh_token_expire: number;
}

export type ResponseResetPassword = Pick<ResponseUser, 'error' | 'detail' | 'timestamp'>;
