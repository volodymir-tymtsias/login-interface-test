import { useState } from 'react';
import { 
  Alert,
  Box, 
  Button, 
  CircularProgress, 
  Divider, 
  FormControl, 
  FormHelperText, 
  IconButton, 
  InputAdornment, 
  Link, 
  OutlinedInput, 
  SvgIcon, 
  Typography, 
  styled,
} from '@mui/material';

import { ReactComponent as GoogleIcon } from '../images/Google.svg';
import { ReactComponent as GithubIcon } from '../images/Github.svg';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { Link as RouterLink } from 'react-router-dom';
import { FormContainer } from '../components/FormContainer';
import { emailTemplate } from '../helpers/emailTemplate';
import { useAppDispatch, useAppSelector, useAuth } from '../app/hooks';
import * as userAction from '../features/user';

const MyButton = styled(Button)({
  fontSize: 14,
  color: '#060e1e',
  padding: '6px 12px',
  border: '1px solid',
  borderRadius: '6px',
  lineHeight: '20px',
  borderColor: '#d3d8dc',
});

type TForm = {
  email: string;
  password: string;
  emailHasError: boolean;
  passwordHasError: boolean;
};

export const LoginPage = () => {
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
    emailHasError: false,
    passwordHasError: false,
  });
  const { loading, error } = useAppSelector(state => state.user);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const onChange = (fieldName: keyof TForm) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch(userAction.clearError());
    setForm({
      ...form,
      [fieldName]: event.target.value,
      [`${fieldName}HasError`]: false,
    });
  };

  const showFieldPassword = form.email.length;
  const isAuth = useAuth().isAuth;

  const onLogin = () => {
    dispatch(userAction.clearError());
    let passwordHasError = false;
    let emailHasError = false;

    if(form.password.length < 8) {
      passwordHasError = true;
    }

    if(!emailTemplate.test(form.email) || form.email.length < 15) {
      emailHasError = true;
    }

    if (passwordHasError || emailHasError){
      setForm({
        ...form,
        emailHasError,
        passwordHasError,
      });

      return;
    }

    dispatch(userAction.initUser({
      email: form.email,
      password: form.password,
    }));
  };

  const onLogout = () => {
    dispatch(userAction.logout());
  };

  return (
    <FormContainer title={isAuth ? 'You are logged in' : 'Log in to your account'}>
      {!isAuth && (
        <>
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
          
          <FormControl 
            sx={{ width: '100%', mb: `${showFieldPassword ? '25px' : '30px'}` }} 
            variant="outlined"
            error={form.emailHasError}
          >
            <OutlinedInput
              type="email"
              size="small"
              placeholder="Work email"
              label=""
              value={form.email}
              onChange={onChange('email')}
            />
            {form.emailHasError && (
              <FormHelperText>
                The e-mail must be in a valid format and contain at least 15 characters.
              </FormHelperText>
            )}
          </FormControl>

          {!!showFieldPassword && (
            <>
              <FormControl 
                sx={{ width: '100%', mb: '15px' }} 
                variant="outlined"
                error={form.passwordHasError}
              >
                <OutlinedInput
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

              <Link 
                component={RouterLink}
                to="forgot-password"
                underline="none"
                sx={{ alignSelf: 'end', mb: '30px'}}
              >
                Forgot your password?
              </Link>
            </>
          )}

          {!!error && (
            <Alert severity="error" sx={{ width: '100%', mb: '15px' }}>
              {(typeof(error) === 'string') ? error : 'Something wrong'}
            </Alert>
          )}

          <Button 
            variant="contained" 
            sx={{ mb: '20px'}}
            onClick={onLogin}
          >
            {loading 
              ? <CircularProgress color="inherit" sx={{ m: '25px' }}/>
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
        </>
      )}

      {isAuth && (<Button 
        variant="contained" 
        sx={{ mb: '20px'}}
        onClick={onLogout}
      >
        Log out
      </Button>)}
    </FormContainer>
  );
};