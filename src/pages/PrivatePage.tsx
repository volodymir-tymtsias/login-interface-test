import { Button } from '@mui/material';

import { FormContainer } from '../components/FormContainer';
import { useAppDispatch } from '../app/hooks';
import * as userAction from '../features/user';

export const PrivatePage = () => {
  const dispatch = useAppDispatch();
  
  const onLogout = () => {
    dispatch(userAction.logout());
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