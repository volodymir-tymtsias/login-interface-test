import { Box, Container, Typography } from '@mui/material';
import { FC } from 'react';
import logo from '../images/Logo.svg';

type Props = {
  title: string;
  children: React.ReactNode;
};

export const FormContainer: FC<Props> = ({
  title,
  children,
}) => {
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
          <img src={logo} alt="Logo Qencode"/>
        </Box>

        <Typography variant="h1" mb="40px" sx={{ textAlign: 'center' }}>{title}</Typography>

        {children}
      </Box>
    </Container>
  );
};