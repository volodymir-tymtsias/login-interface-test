import { useState } from 'react';
import { 
  Alert,
  Button, 
  CircularProgress, 
  FormControl, 
  FormHelperText, 
  IconButton, 
  InputAdornment, 
  InputLabel, 
  OutlinedInput, 
} from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import styled from '@emotion/styled';
import { FormContainer } from '../components/FormContainer';
import { FormResetPassword } from '../types/FormsTypes';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import * as userAction from '../features/user';
import { getErrorMessage } from '../helpers/getError';

const MyPasswordInput = styled(OutlinedInput)({
  'label + &': {
    marginTop: '25px',
  },
});

const InputPasswordLabel = styled(InputLabel)({
  fontSize: '15px',
  fontWeight: 500,
  color: '#060e1e',
  lineHeight: '21px',
});

export const ResetPasswordPage = () => {
  const pathnameArr = useLocation().pathname.split('/');
  const tokenFromLink = pathnameArr[pathnameArr.length - 1];
  
  const dispatch = useAppDispatch();
  const { loading, newPasswordHasBeenSet, error } = useAppSelector(state => state.user);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    password: '',
    confirmPassword: '',
    passwordHasError: false,
    confirmPasswordHasError: false,
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const onChange = (fieldName: keyof FormResetPassword) => 
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      dispatch(userAction.clearError());
      setForm({
        ...form,
        [fieldName]: event.target.value,
        [`${fieldName}HasError`]: false,
      });
    };

  const onReset = () => {
    dispatch(userAction.clearError());
    let passwordHasError = false;
    let confirmPasswordHasError = false;

    if(form.password.length < 8) {
      passwordHasError = true;
    }

    if(form.password !== form.confirmPassword) {
      confirmPasswordHasError = true;
    }

    if (passwordHasError || confirmPasswordHasError){
      setForm({
        ...form,
        passwordHasError,
        confirmPasswordHasError,
      });

      return;
    }

    const data = {
      token: tokenFromLink,
      secret: 'testSecretTest',
      password: form.password,
      password_confirm: form.confirmPassword,
    };

    dispatch(userAction.userSetNewPassword(data));
  };

  const onGoHome = () => {
    dispatch(userAction.deleteResetSentToMail());
    navigate('/');
  };

  return (
    <FormContainer title="Create new Password?">
      {!newPasswordHasBeenSet && (
        <>
          <FormControl 
            variant="standard" 
            sx={{ width: '100%', mb: '25px' }}
            error={form.passwordHasError}
          >
            <InputPasswordLabel shrink htmlFor="pass-input">
              Password
            </InputPasswordLabel>
            <MyPasswordInput
              id="pass-input"
              type={showPassword ? 'text' : 'password'}
              size="small"
              placeholder="Password"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                  </IconButton>
                </InputAdornment>
              }
              label=""
              value={form.password}
              onChange={onChange('password')}
            />
            {form.passwordHasError && (
              <FormHelperText>
                The password field should be at least 8 characters long.
              </FormHelperText>
            )}
          </FormControl>

          <FormControl 
            variant="standard" 
            sx={{ width: '100%', mb: '25px' }}
            error={form.confirmPasswordHasError}
          >
            <InputPasswordLabel shrink htmlFor="confirm-pass-input">
              Confirm Password
            </InputPasswordLabel>
            <MyPasswordInput
              id="confirm-pass-input"
              type={showPassword ? 'text' : 'password'}
              size="small"
              placeholder="Password"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                  </IconButton>
                </InputAdornment>
              }
              label=""
              value={form.confirmPassword}
              onChange={onChange('confirmPassword')}
            />
            {form.confirmPasswordHasError && (
              <FormHelperText>
                The entered passwords do not match.
              </FormHelperText>
            )}
          </FormControl>

          {!!error && (
            <Alert severity="error" sx={{ width: '100%', mb: '15px' }}>
              {getErrorMessage(error)}
            </Alert>
          )}

          <Button 
            variant="contained" 
            sx={{ mb: '20px'}}
            onClick={onReset}
          >
            {loading 
              ? <CircularProgress color="inherit"/>
              : 'Reset Password' 
            }
          </Button>
        </>
      )}
      
      {newPasswordHasBeenSet && (
        <>
          <Alert severity="success" sx={{ width: '100%', mb: '15px' }}>
            The new password has been set successfully
          </Alert>
          <Button 
            variant="contained" 
            sx={{ mb: '20px'}}
            onClick={onGoHome}
          >
            Go Home
          </Button>
        </>
      )}
    </FormContainer>
  );
};