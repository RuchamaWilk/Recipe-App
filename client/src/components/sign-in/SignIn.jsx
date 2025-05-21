import React from 'react';
import TextField from '@mui/material/TextField';
import LoginIcon from '@mui/icons-material/Login';
import { Button, Dialog } from '@mui/material';
import { Typography, Box } from '@mui/material';
import { useSignIn } from '../../hooks/useSignIn';
import './SignIn.css';

/**
 * Form text field component
 */
const FormTextField = ({ 
  id, 
  label, 
  value, 
  onChange, 
  error, 
  type = "text", 
  placeholder,
  inputRef,
  onKeyDown 
}) => {
  return (
    <TextField
      id={id}
      label={label}
      variant="outlined"
      fullWidth
      type={type}
      value={value}
      placeholder={placeholder || `Enter your ${label.toLowerCase()}`}
      onChange={onChange}
      onKeyDown={onKeyDown}
      error={!!error}
      helperText={error}
      required
      inputRef={inputRef}
      className="signin-input-field"
      InputProps={{
        sx: {
          borderRadius: '8px',
        }
      }}
    />
  );
};

/**
 * Sign-in dialog component
 */
const SignInPage = ({ open = true, onClose }) => {
  // Use the sign-in hook for all logic
  const {
    signInError,
    formFields,
    handleSignIn,
    handleClose
  } = useSignIn(onClose);

  return (
    <Dialog 
      open={open} 
      onClose={handleClose} 
      PaperProps={{ 
        className: "signin-dialog-paper"
      }}
    >
      <Box className="signin-container">
        <LoginIcon className="signin-icon" />
        <Typography variant="h5" component="h1" className="signin-title">
          Sign In
        </Typography>
        
        {formFields.map((field) => (
          <FormTextField
            key={field.id}
            {...field}
          />
        ))}

        <Button
          onClick={handleSignIn}
          variant="contained"
          fullWidth
          startIcon={<LoginIcon />}
          className="signin-button"
        >
          Sign In
        </Button>
        
        {signInError !== '' && (
          <Typography 
            variant="body2" 
            className="signin-error-message"
          >
            {signInError}
          </Typography>
        )}
      </Box>
    </Dialog>
  );
};

export default SignInPage;