import { useState } from 'react';
import { 
  Alert,
  Button, 
  CircularProgress, 
} from '@mui/material';
import { FormContainer } from '../components/FormContainer';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import * as userAction from '../features/user';
import { getErrorMessage } from '../helpers/getError';
import { PasswordInput } from '../components/PasswordInput';

export const ResetPasswordPage = () => {
  const pathnameArr = useLocation().pathname.split('/');
  const tokenFromLink = pathnameArr[pathnameArr.length - 1];
  
  const dispatch = useAppDispatch();
  const { loading, newPasswordHasBeenSet, error } = useAppSelector(state => state.user);
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordHasError, setPasswordHasError] = useState(false);
  const [confirmPasswordHasError, setConfirmPasswordHasError] = useState(false);
  
  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch(userAction.clearError());
    setPassword(event.target.value);
    setPasswordHasError(false);
  };

  const onChangeConfirmPassword = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch(userAction.clearError());
    setConfirmPassword(event.target.value);
    setConfirmPasswordHasError(false);
  };

  const onReset = () => {
    dispatch(userAction.clearError());
    let invalidPassword = false;
    let invalidConfirmPassword = false;

    if(password.length < 8) {
      invalidPassword = true;
    }

    if(password !== confirmPassword) {
      invalidConfirmPassword = true;
    }

    if (invalidPassword || invalidConfirmPassword){
      setPasswordHasError(invalidPassword);
      setConfirmPasswordHasError(invalidConfirmPassword);
      return;
    }

    const data = {
      token: tokenFromLink,
      secret: 'testSecretTest',
      password: password,
      password_confirm: confirmPassword,
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
          <PasswordInput 
            marginBottom="25px"
            value={password}
            onChange={onChangePassword}
            id="password-input"
            error={passwordHasError}
            textError="The password field should be at least 8 characters long."
            textLabel="Password"
          />

          <PasswordInput 
            marginBottom="25px"
            value={confirmPassword}
            onChange={onChangeConfirmPassword}
            id="confirm-password-input"
            error={confirmPasswordHasError}
            textError="The entered passwords do not match."
            textLabel="Confirm Password"
          />

          {!!error && (
            <Alert severity="error" sx={{ boxSizing: 'border-box', width: '100%', mb: '15px' }}>
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
          <Alert severity="success" sx={{ boxSizing: 'border-box', width: '100%', mb: '15px' }}>
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