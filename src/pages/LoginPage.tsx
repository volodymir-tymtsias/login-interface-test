import { useState } from 'react';
import { 
  Alert,
  Box, 
  Button, 
  CircularProgress, 
  Divider, 
  Link, 
  SvgIcon, 
  Typography, 
  styled,
} from '@mui/material';

import { ReactComponent as GoogleIcon } from '../images/Google.svg';
import { ReactComponent as GithubIcon } from '../images/Github.svg';
import { Navigate, Link as RouterLink } from 'react-router-dom';
import { FormContainer } from '../components/FormContainer';
import { emailTemplate } from '../helpers/emailTemplate';
import { useAppDispatch, useAppSelector, useAuth } from '../app/hooks';
import * as userAction from '../features/user';
import { EmailInput } from '../components/EmailInput';
import { getErrorMessage } from '../helpers/getError';
import { PasswordInput } from '../components/PasswordInput';

const MyButton = styled(Button)({
  fontSize: 14,
  color: '#060e1e',
  padding: '6px 12px',
  border: '1px solid',
  borderRadius: '6px',
  lineHeight: '20px',
  borderColor: '#d3d8dc',
});

export const LoginPage = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [emailHasError, setEmailHasError] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordHasError, setPasswordHasError] = useState(false);
  
  const { loading, error } = useAppSelector(state => state.user);

  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch(userAction.clearError());
    setEmail(event.target.value);
    setEmailHasError(false);
  };

  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch(userAction.clearError());
    setPassword(event.target.value);
    setPasswordHasError(false);
  };

  const showFieldPassword = email.length;
  const isAuth = useAuth().isAuth;

  const onLogin = () => {
    dispatch(userAction.clearError());
    let invalidPassword = false;
    let invalidEmail = false;

    if(password.length < 8) {
      invalidPassword = true;
    }

    if(!emailTemplate.test(email) || email.length < 15) {
      invalidEmail = true;
    }

    if (invalidPassword || invalidEmail){
      setPasswordHasError(invalidPassword);
      setEmailHasError(invalidEmail);
      
      return;
    }

    dispatch(userAction.initUser({
      email,
      password,
    }));
  };

  return (
    !isAuth ? (
      <FormContainer title="Log in to your account">
        <Box
          component="div"
          sx={{
            display: 'flex',
            width: '100%',
            gap: '16px',
            alignItems: 'center',
            flexGrow: 1,
            mb: '30px',
          }}
        >
          <MyButton 
            variant="outlined" 
            startIcon={<SvgIcon component={GoogleIcon} inheritViewBox />}
          >
            Google
          </MyButton>
          <MyButton 
            variant="outlined" 
            startIcon={<SvgIcon component={GithubIcon} inheritViewBox />}
          >
            Github
          </MyButton>
        </Box>

        <Divider 
          sx={{
            width: '100%',
            mb: '32px',
            color: '#bec5cc',
            fontSize: '12px',
            fontFamily: 'BasisGrotesquePro, Arial',
            fontWeight: 500,
          }}>OR</Divider>

        <Box component="div" sx={{ width: '100%', mb: `${showFieldPassword ? '25px' : '30px'}` }}>
          <EmailInput value={email} onChange={onChangeEmail} error={emailHasError} />
        </Box>

        {!!showFieldPassword && (
          <>
            <PasswordInput
              marginBottom="15px"
              value={password}
              onChange={onChangePassword}
              id="password-input"
              error={passwordHasError}
              textError="The password field should be at least 8 characters long."
            />
            
            <Link 
              component={RouterLink}
              to="/forgot-password"
              underline="none"
              sx={{ alignSelf: 'end', mb: '30px'}}
            >
              Forgot your password?
            </Link>
          </>
        )}

        {!!error && (
          <Alert severity="error" sx={{ boxSizing: 'border-box', width: '100%', mb: '15px' }}>
            {getErrorMessage(error)}
          </Alert>
        )}

        <Button 
          variant="contained" 
          sx={{ mb: '20px'}}
          onClick={onLogin}
        >
          {loading 
            ? <CircularProgress color="inherit"/>
            : 'Log in to Qencode' 
          }
        </Button>

        <Box 
          component="div" 
          sx={{ 
            display: 'flex', 
            gap: '5px',
            alignItems: 'center',
            flexDirection: { xs: 'column', sm: 'row' },
          }}
        >
          <Typography variant="body1">Is your company new to Qencode?</Typography>
          <Link 
            component={RouterLink}
            to="#"
            underline="none"
          >
            Sign up
          </Link>
        </Box>
      </FormContainer>
    )
      : <Navigate to="/" />
  );
};