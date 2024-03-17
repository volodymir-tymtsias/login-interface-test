import { useState } from 'react';
import { Button, FormControl, FormHelperText, OutlinedInput } from '@mui/material';
import styled from '@emotion/styled';
import { FormContainer } from '../components/FormContainer';
import { emailTemplate } from '../helpers/emailTemplate';
import {useNavigate } from 'react-router-dom';

const MyButton = styled(Button)({
  color: '#060e1e',
  border: '1px solid',
  borderColor: '#d3d8dc',
});

export const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    emailHasError: false,
  });

  const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

    navigate('/reset-password');
  };

  const onCancel = () => {
    navigate(-1);
  };

  return (
    <FormContainer title="Forgot Password?">
      <FormControl 
        sx={{ width: '100%', mb: '25px' }} 
        variant="outlined" 
        error={form.emailHasError}
      >
        <OutlinedInput
          type="email"
          size="small"
          placeholder="Work email"
          label=""
          value={form.email}
          onChange={onChange}
        />
        {form.emailHasError && (
          <FormHelperText>
            The email should be a valid email format.
          </FormHelperText>
        )}
      </FormControl>

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