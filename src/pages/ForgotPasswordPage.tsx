import { useState } from 'react';
import { Alert, Box, Button, CircularProgress } from '@mui/material';
import styled from '@emotion/styled';
import { FormContainer } from '../components/FormContainer';
import { emailTemplate } from '../helpers/emailTemplate';
import {useNavigate } from 'react-router-dom';
import { EmailInput } from '../components/EmailInput';
import { FormForgotPassword } from '../types/FormsTypes';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import * as userAction from '../features/user';

const MyButton = styled(Button)({
  color: '#060e1e',
  border: '1px solid',
  borderColor: '#d3d8dc',
});

export const ForgotPasswordPage = () => {
  const dispatch = useAppDispatch();
  const { loading, resetSentToMail, error } = useAppSelector(state => state.user);
  const navigate = useNavigate();
  const [form, setForm] = useState<FormForgotPassword>({
    email: '',
    emailHasError: false,
  });

  const onChange = () => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch(userAction.clearError());
    setForm({
      ...form,
      email: event.target.value,
      emailHasError: false,
    });
  };

  const onSend = () => {
    if(!emailTemplate.test(form.email) || form.email.length < 15) {
      setForm({
        ...form,
        emailHasError: true,
      });

      return;
    }

    dispatch(userAction.userPasswordReset(form.email));
  };
  
  const onSimulate = () => {
    dispatch(userAction.clearResetSentToMail());
    navigate('/reset-password/test-test-test?secret=secret');
  };

  const onCancel = () => {
    dispatch(userAction.clearError());
    dispatch(userAction.clearResetSentToMail());
    navigate(-1);
  };

  return (
    <FormContainer title="Forgot Password?">
      {!resetSentToMail && (
        <>
          <Box component="div" sx={{ width: '100%', mb: '25px' }}>
            <EmailInput form={form} onChange={onChange} />
          </Box>

          {!!error && (
            <Alert severity="error" sx={{ width: '100%', mb: '15px' }}>
              {(typeof(error) === 'string') ? error : 'Something wrong'}
            </Alert>
          )}
          
          <Button 
            variant="contained" 
            sx={{ mb: '20px'}}
            onClick={onSend}
          >
            {loading 
              ? <CircularProgress color="inherit" sx={{ m: '25px' }}/>
              : 'Send' 
            }
          </Button>
        </>
      )}

      {resetSentToMail && (
        <>
          <Alert severity="success" sx={{ width: '100%', mb: '15px' }}>
            {`Please check your email ${form.email} to complete the password reset process.`}
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