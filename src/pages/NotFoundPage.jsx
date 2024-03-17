import { Box, Container, Paper, Typography } from '@mui/material';

export const NotFoundPage = () => {
  return (
    <Container maxWidth="xl">
      <Paper sx={{ p: 1 }} component="main">
        <Box textAlign="center">
          <Typography variant="h4" sx={{ mt: '10px'}}>
            Page not found
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};
