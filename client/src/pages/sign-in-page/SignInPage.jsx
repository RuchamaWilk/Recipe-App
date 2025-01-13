//client/src/pages/sign-in-page/SignInPage
import React, { useState } from 'react'
import {checkChef} from '../../services/apiService'
import TextField from '@mui/material/TextField';
import LoginIcon from '@mui/icons-material/Login';
import { Button,Dialog } from '@mui/material';
import { Typography ,Box} from '@mui/material';
import {  validateEmail, validatePassword } from '../../utils/validation';
import { useNavigate } from 'react-router-dom';




const SignInPage = ({ open= true, onClose,onLogin  = () => {} }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [signInError, setSignInError] = useState('')


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
          const response =await checkChef(email, password); // קריאה לפונקציה שתשלח את הנתונים לשרת
          console.log("EEEE" ,response.token)
          if (response.token) {
            console.log("Token saved:", response.token);
            onLogin(email, response.token);
            handleClose()

          }/* else {
            setSignInError(/*response.message || 'Login failed');
          }*/
      } catch (error) {
          console.error('Error during login:', error);
      }
    }

  return (
    <Dialog open={open} onClose={handleClose} PaperProps={{ sx: { padding: 4, borderRadius: 3, width: '400px' } }}>
      <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
        {/* כותרת */}
        <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold', color: '#2F3645' }}>
          Sign In
        </Typography>

        {/* שדה מייל */}
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

        {/* שדה סיסמה */}
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

        {/* כפתור התחברות */}
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
        {/*{signInError=== 'Login failed' && (
          <Typography variant="body2" color="error" sx={{ mt: 2, textAlign: 'center' }}>
            {signInError}
          </Typography>
        )}*/}
      </Box>
    </Dialog>
  );
};

export default SignInPage