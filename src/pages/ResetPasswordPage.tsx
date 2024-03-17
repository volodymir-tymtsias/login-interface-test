import { useState } from 'react';
import { 
  Button, 
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

type TForm = {
  password: string;
  confirmPassword: string;
  passwordHasError: boolean;
  confirmPasswordHasError: boolean;
};

export const ResetPasswordPage = () => {
  const [showPassword, setShowPassword] = useState(false);
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

  const onChange = (fieldName: keyof TForm) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({
      ...form,
      [fieldName]: event.target.value,
      [`${fieldName}HasError`]: false,
    });
  };

  const onReset = () => {
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
  };

  return (
    <FormContainer title="Create new Password?">
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

      <Button 
        variant="contained" 
        sx={{ mb: '20px'}}
        onClick={onReset}
      >Reset Password</Button>
    </FormContainer>
  );
};