import { Button } from '@mui/material';

import { FormContainer } from '../components/FormContainer';
import { useAppDispatch } from '../app/hooks';
import * as userAction from '../features/user';
import { useNavigate } from 'react-router-dom';

export const PrivatePage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const onLogout = () => {
    dispatch(userAction.logout());
    navigate('login');
  };

  return (
    <FormContainer title="You are logged in">
      <Button 
        variant="contained" 
        sx={{ mb: '20px'}}
        onClick={onLogout}
      >
        Log out
      </Button>
    </FormContainer>
  );
};