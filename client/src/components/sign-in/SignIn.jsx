//client/src/pages/sign-in-page/SignInPage
import React, { useState } from 'react'
import {signIn} from '../../services/apiService'
import TextField from '@mui/material/TextField';
import LoginIcon from '@mui/icons-material/Login';
import { Button,Dialog } from '@mui/material';
import { Typography ,Box} from '@mui/material';
import {  validateEmail, validatePassword } from '../../utils/validation';
import { useUser } from '../../providers/UserProvider'; // ייבוא הקונטקסט
import { useNavigate } from 'react-router-dom';

const FormTextField = ({ 
  id, 
  label, 
  value, 
  onChange, 
  error, 
  type = "text", 
  placeholder 
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
      error={!!error}
      helperText={error}
      required
    />
  );
};

const SignInPage = ({ open= true, onClose}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [signInError, setSignInError] = useState('')
  const { login } = useUser(); // מקבלים גישה לפונקציות הקונטקסט
  const navigate = useNavigate();

  const formFields = [
    {
      id: "email",
      label: "Email",
      value: email,
      onChange: (ev) => setEmail(ev.target.value),
      error: emailError
    },
    {
      id: "password",
      label: "Password",
      value: password,
      onChange: (ev) => setPassword(ev.target.value),
      error: passwordError,
      type: "password"
    }
  ];

  const resetText=()=>{
    setEmail('');
    setPassword('')
  }

  const resetError=()=>{
    setEmailError('')
    setPasswordError('')
  }
  const handleClose = () =>{
    resetText();
    resetError()
    onClose()
  }

  const onButtonClick =async () => {
    resetError()
    setEmailError(validateEmail(email));
    setPasswordError(validatePassword(password));
    console.log("loginPage" ,email)
    try {
          const response =await signIn(email, password); // קריאה לפונקציה שתשלח את הנתונים לשרת
          if (response.token) {
            login(response.token, response.user);
            navigate('/')
            handleClose()

          } else {
            console.log("loginPage failed" )
            setSignInError(response.message || 'Login failed');
          }
      } catch (error) {
          console.error('Error during login:', error);
      }
    }

  return (
    <Dialog open={open} onClose={handleClose} PaperProps={{ sx: { padding: 4, borderRadius: 3, width: '400px' } }}>
      <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
        <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold', color: '#2F3645' }}>
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
          sx={{
            backgroundColor: '#2F3645',
            color: '#FFFFFF',
            fontWeight: 'bold',
            paddingY: 1,
            '&:hover': {
              backgroundColor: '#4A5367',
            },
          }}
        >
          Sign In
        </Button>
        {signInError && (
          <Typography variant="body2" color="error" sx={{ mt: 2, textAlign: 'center' }}>
            {signInError}
          </Typography>
        )}

      </Box>
    </Dialog>
  );
};

export default SignInPage