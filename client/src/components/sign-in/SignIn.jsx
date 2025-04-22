import React, { useState,useRef } from 'react'
import { signIn } from '../../services/apiService'
import TextField from '@mui/material/TextField';
import LoginIcon from '@mui/icons-material/Login';
import { Button, Dialog } from '@mui/material';
import { Typography, Box } from '@mui/material';
import { validateEmail, validatePassword } from '../../utils/validation';
import { useUser } from '../../providers/UserProvider';
import { useNavigate } from 'react-router-dom';
import './SignIn.css';

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

const SignInPage = ({ open = true, onClose }) => {
  //const emailRef = useRef();
  const passwordRef = useRef();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [signInError, setSignInError] = useState('')
  const { login } = useUser();
  const navigate = useNavigate();

  const handleKeyDown = (e, fieldId) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (fieldId === 'email') {
        passwordRef.current?.focus();
      } else if (fieldId === 'password') {
        onButtonClick(); // מבצע כניסה
      }
    }
  };

  const formFields = [
    {
      id: "email",
      label: "Email",
      value: email,
      onChange: (ev) => setEmail(ev.target.value),
      error: emailError,
      //inputRef: emailRef,
      onKeyDown: (e) => handleKeyDown(e, 'email')
    },
    {
      id: "password",
      label: "Password",
      value: password,
      onChange: (ev) => setPassword(ev.target.value),
      error: passwordError,
      type: "password",
      inputRef: passwordRef,
      onKeyDown: (e) => handleKeyDown(e, 'password')
    }
  ];

  const resetText = () => {
    setEmail('');
    setPassword('');
  }

  const resetError = () => {
    setEmailError('');
    setPasswordError('');
    setSignInError('');
  }
  
  const handleClose = () => {
    resetText();
    resetError();
    onClose();
  }
  
  

  const onButtonClick = async() => {
    resetError();
    setEmailError(validateEmail(email));
    setPasswordError(validatePassword(password));
    if (validatePassword(password) !== '' || validateEmail(email) !== '') {
      return;
    }

    try {
      const response = await signIn(email, password);
      if (response.token) {
        login(response.token, response.user);
        navigate('/');
        handleClose();
      }
    } catch (error) {
      console.error('Error during login:', error);
      setSignInError(error.message);
    }
  }

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
          onClick={onButtonClick}
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