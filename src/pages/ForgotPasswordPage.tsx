import { useState } from 'react';
import { Alert, Box, Button, CircularProgress } from '@mui/material';
import styled from '@emotion/styled';
import { FormContainer } from '../components/FormContainer';
import { emailTemplate } from '../helpers/emailTemplate';
import {useNavigate } from 'react-router-dom';
import { EmailInput } from '../components/EmailInput';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import * as userAction from '../features/user';
import { getErrorMessage } from '../helpers/getError';

const MyButton = styled(Button)({
  color: '#060e1e',
  border: '1px solid',
  borderColor: '#d3d8dc',
});

export const ForgotPasswordPage = () => {
  const dispatch = useAppDispatch();
  const { loading, resetSentToMail, error } = useAppSelector(state => state.user);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [emailHasError, setEmailHasError] = useState(false);
  
  const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch(userAction.clearError());
    setEmail(event.target.value);
    setEmailHasError(false);
  };

  const onSend = () => {
    if(!emailTemplate.test(email) || email.length < 15) {
      setEmailHasError(true);

      return;
    }

    dispatch(userAction.userPasswordReset(email));
  };
  
  const onSimulate = () => {
    dispatch(userAction.deleteResetSentToMail());
    dispatch(userAction.deleteNewPasswordHasBeenSet());
    navigate('/reset-password/testToken-test-test');
  };

  const onCancel = () => {
    dispatch(userAction.clearError());
    dispatch(userAction.deleteResetSentToMail());
    navigate(-1);
  };

  return (
    <FormContainer title="Forgot Password?">
      {!resetSentToMail && (
        <>
          <Box component="div" sx={{ width: '100%', mb: '25px' }}>
            <EmailInput value={email} onChange={onChange} error={emailHasError} />
          </Box>

          {!!error && (
            <Alert severity="error" sx={{ width: '100%', mb: '15px' }}>
              {getErrorMessage(error)}
            </Alert>
          )}
          
          <Button 
            variant="contained" 
            sx={{ mb: '20px'}}
            onClick={onSend}
          >
            {loading 
              ? <CircularProgress color="inherit"/>
              : 'Send' 
            }
          </Button>
        </>
      )}

      {resetSentToMail && (
        <>
          <Alert severity="success" sx={{ width: '100%', mb: '15px' }}>
            {`Please check your email ${email} to complete the password reset process.`}
          </Alert>
          <Button 
            variant="contained" 
            sx={{ mb: '20px'}}
            onClick={onSimulate}
          >
            Simulate the transition from mail
          </Button>
        </>
      )}

      <MyButton variant="outlined" onClick={onCancel}>
        Cancel
      </MyButton>
    </FormContainer>
  );
};