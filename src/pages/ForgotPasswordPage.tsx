import { useState } from 'react';
import { Box, Button } from '@mui/material';
import styled from '@emotion/styled';
import { FormContainer } from '../components/FormContainer';
import { emailTemplate } from '../helpers/emailTemplate';
import {useNavigate } from 'react-router-dom';
import { EmailInput } from '../components/EmailInput';
import { FormForgotPassword } from '../types/FormsTypes';
import { useAppDispatch } from '../app/hooks';
import * as userAction from '../features/user';

const MyButton = styled(Button)({
  color: '#060e1e',
  border: '1px solid',
  borderColor: '#d3d8dc',
});

export const ForgotPasswordPage = () => {
  const dispatch = useAppDispatch();
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
    if(!emailTemplate.test(form.email)) {
      setForm({
        ...form,
        emailHasError: true,
      });

      return;
    }

    navigate('/reset-password/test-test-test?secret=secret');
  };

  const onCancel = () => {
    navigate(-1);
  };

  return (
    <FormContainer title="Forgot Password?">
      <Box component="div" sx={{ width: '100%', mb: '25px' }}>
        <EmailInput form={form} onChange={onChange} />
      </Box>
      
      <Button 
        variant="contained" 
        sx={{ mb: '20px'}}
        onClick={onSend}
      >
        Send
      </Button>

      <MyButton variant="outlined" onClick={onCancel}>
        Cancel
      </MyButton>
    </FormContainer>
  );
};