//client/src/pages/sign-in-page/SignInPage
import React, { useState } from 'react'
import {signIn} from '../../services/apiService'
import TextField from '@mui/material/TextField';
import LoginIcon from '@mui/icons-material/Login';
import { Button,Dialog } from '@mui/material';
import { Typography ,Box} from '@mui/material';
import {  validateEmail, validatePassword } from '../../utils/validation';
import { useUser } from '../../providers/UserProvider'; // ייבוא הקונטקסט

const SignInPage = ({ open= true, onClose}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [signInError, setSignInError] = useState('')
  const { setUser, setToken } = useUser(); // מקבלים גישה לפונקציות הקונטקסט

  const handleClose = () =>{
    setEmail('');
    setPassword('')
    setEmailError('')
    setPasswordError('')
    onClose()
  }

  const onButtonClick =async () => {
    setEmailError('')
    setPasswordError('')
    setEmailError(validateEmail(email));
    setPasswordError(validatePassword(password));
    console.log("loginPage" ,email)
    try {
          const response =await signIn(email, password); // קריאה לפונקציה שתשלח את הנתונים לשרת
          if (response.token) {
            console.log("Token saved:", response.token);
            setToken(response.token); 
            setUser(response.user);
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

        <TextField
          id="email"
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          placeholder="Enter your email"
          onChange={(ev) => setEmail(ev.target.value)}
          error={!!emailError}
          helperText={emailError}
        />

        <TextField
          id="password"
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          value={password}
          placeholder="Enter your password"
          onChange={(ev) => setPassword(ev.target.value)}
          error={!!passwordError}
          helperText={passwordError}
        />

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