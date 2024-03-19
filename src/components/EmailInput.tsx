import { FC } from 'react';
import { FormForgotPassword, FormLogin } from '../types/FormsTypes';
import { FormControl, FormHelperText, OutlinedInput } from '@mui/material';

type Props = {
  form: FormLogin | FormForgotPassword;
  onChange: (fieldName: keyof FormLogin) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const EmailInput: FC<Props> = ({ form, onChange}) => {
  return (
    <FormControl 
      sx={{ width: '100%' }} 
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
  );
};