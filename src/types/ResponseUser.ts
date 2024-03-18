export interface ResponseUser {
  error: number;
  detail: any[] | string | number;
  timestamp: number;
  access_token: string;
  refresh_token: string;
  token_expire: number;
  refresh_token_expire: number;
}
