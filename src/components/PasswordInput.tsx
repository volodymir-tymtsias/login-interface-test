import styled from '@emotion/styled';
import { FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { FC, useState } from 'react';

type Props = {
  marginBottom: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  id: string;
  error: boolean;
  textError: string;
  textLabel?: string;
}

const InputPasswordLabel = styled(InputLabel)({
  fontSize: '15px',
  fontWeight: 500,
  color: '#060e1e',
  lineHeight: '21px',
});

const MyPasswordInput = styled(OutlinedInput)({
  'label + &': {
    marginTop: '25px',
  },
});

export const PasswordInput: FC<Props> = ({
  marginBottom,
  value,
  onChange,
  id,
  error,
  textError,
  textLabel,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <FormControl 
      variant="standard" 
      sx={{ width: '100%', mb: marginBottom }}
      error={error}
    >
      {textLabel && (
        <InputPasswordLabel shrink htmlFor={id}>
          {textLabel}
        </InputPasswordLabel>
      )}
      
      <MyPasswordInput
        id={id}
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
        value={value}
        onChange={onChange}
      />
      {error && (
        <FormHelperText>
          {textError}
        </FormHelperText>
      )}
    </FormControl>
  );
};