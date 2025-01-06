import React, { useState } from 'react';
import {  Link } from 'react-router-dom';
import { addUserToDb } from '../../services/apiService';
import TextField from '@mui/material/TextField';
import { Button, Dialog, Box, Typography } from '@mui/material';
import { validateUserName, validateEmail, validatePassword } from '../../utils/validation';

const SignUp = ({ open, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [userNameError, setUserNameError] = useState('');

  const handleClose = () =>{
    setEmailError('');
    setPasswordError('');
    setUserNameError('');
    setUserName('');
    setEmail('');
    onClose();
  }
  
  const handleSubmit = async () => {
    setEmailError('');
    setPasswordError('');
    setUserNameError('');
    setUserNameError(validateUserName(userName));
    setEmailError(validateEmail(email));
    setPasswordError(validatePassword(password));
    try {
      console.log('addUserToDb');
      await addUserToDb(userName, email, password);
      handleClose()
    } catch (err) {
      console.error('Error during Sign Up:', err);
    }
  };

  return (
    <Dialog
    open={open}
    onClose={handleClose}
    PaperProps={{
      sx: {
        padding: 4,
        borderRadius: 3,
        width: '400px',
      },
    }}
  >
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      {/* כותרת */}
      <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold', color: '#2F3645' }}>
        Sign Up
      </Typography>

      {/* שדה שם משתמש */}
      <TextField
        id="outlined-userName"
        label="User Name"
        variant="outlined"
        value={userName}
        onChange={(ev) => setUserName(ev.target.value)}
        error={!!userNameError}
        helperText={userNameError}
        fullWidth
      />

      {/* שדה מייל */}
      <TextField
        id="outlined-email"
        label="Email"
        variant="outlined"
        value={email}
        onChange={(ev) => setEmail(ev.target.value)}
        error={!!emailError}
        helperText={emailError}
        fullWidth
      />

      {/* שדה סיסמה */}
      <TextField
        id="outlined-password"
        label="Password"
        variant="outlined"
        type="password"
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
        error={!!passwordError}
        helperText={passwordError}
        fullWidth
      />

      {/* כפתור הרשמה */}
      <Button
        onClick={handleSubmit}
        variant="contained"
        fullWidth
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
        Sign Up
      </Button>

      <Box display="flex" justifyContent="space-between" width="100%">  
        <Typography
            variant="body2"
            sx={{
            color: '#4A5367',
            marginTop: 2,
            textAlign: 'center',
            }}
        >
            <Link
            to="/chef-sign-up"
            onClick={handleClose}
            style={{
                textDecoration: 'none',
                color: '#2F3645',
                fontWeight: 'bold',
            }}
            >
            Sign up as a chef
            </Link>
        </Typography>
        <Button
            onClick={handleClose}
            variant="outlined" 
            sx={{
            fontWeight: 'bold',
            color: '#2F3645',
            borderColor: '#2F3645',
            marginTop: 1,
            '&:hover': {
                backgroundColor: '#F1E4E4',
            },
            }}
        >
            Cancel
        </Button>
      </Box>
    </Box>
  </Dialog>
);
};

export default SignUp;
