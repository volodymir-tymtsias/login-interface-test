import { useState } from 'react';
import { 
  Box, 
  Button, 
  Container, 
  Divider, 
  FormControl, 
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
import { Logo } from '../components/Logo';

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
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Container maxWidth="xl">
      <Box
        component="div"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          maxWidth: '400px',
          flexDirection: 'column',
          m: 'auto',
          mt: { xs: '60px', sm: '80px', md: '100px', lg: '180px' },
        }}
      >
        <Box
          component="div"
          sx={{ mb: { xs: '40px', md: '80px' } }}
        >
          <Logo />
        </Box>

        <Typography variant="h1" mb="40px" sx={{ textAlign: 'center' }}>Log in to your account</Typography>

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
        
        <FormControl sx={{ width: '100%', mb: '25px' }} variant="outlined">
          <OutlinedInput
            type="email"
            size="small"
            placeholder="Work email"
            label=""
          />
        </FormControl>

        <FormControl sx={{ width: '100%', mb: '15px' }} variant="outlined">
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
          />
        </FormControl>

        <Link 
          component={RouterLink}
          to="forgot-password"
          underline="none"
          sx={{ alignSelf: 'end', mb: '30px'}}
        >
          Forgot your password?
        </Link>

        <Button variant="contained" sx={{ mb: '20px'}}>Log in to Qencode</Button>

        <Box component="div" sx={{ display: 'flex', gap: '5px'}}>
          <Typography variant="body1">Is your company new to Qencode?</Typography>
          <Link 
            component={RouterLink}
            to="#"
            underline="none"
          >
            Sign up
          </Link>
        </Box>
      </Box>
    </Container>
  );
};