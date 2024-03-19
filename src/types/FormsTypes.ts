export type FormLogin = {
  email: string;
  password: string;
  emailHasError: boolean;
  passwordHasError: boolean;
};

export type FormForgotPassword = {
  email: string;
  emailHasError: boolean;
};

export type FormResetPassword = {
  password: string;
  confirmPassword: string;
  passwordHasError: boolean;
  confirmPasswordHasError: boolean;
};