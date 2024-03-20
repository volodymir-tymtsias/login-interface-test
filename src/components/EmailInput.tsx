import { FC } from 'react';
import { FormControl, FormHelperText, OutlinedInput } from '@mui/material';

type Props = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error: boolean;
}

export const EmailInput: FC<Props> = ({ value, onChange, error}) => {
  return (
    <FormControl 
      sx={{ width: '100%' }} 
      variant="outlined"
      error={error}
    >
      <OutlinedInput
        type="email"
        size="small"
        placeholder="Work email"
        label=""
        value={value}
        onChange={onChange}
      />
      {error && (
        <FormHelperText>
          The e-mail must be in a valid format and contain at least 15 characters.
        </FormHelperText>
      )}
    </FormControl>
  );
};