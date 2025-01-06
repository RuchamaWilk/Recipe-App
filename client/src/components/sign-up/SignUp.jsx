import React, { useState } from 'react';
import {  Link } from 'react-router-dom';
import { addUserToDb } from '../../services/apiService';
import TextField from '@mui/material/TextField';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Box, Typography } from '@mui/material';
import { validateUserName, validateEmail, validatePassword } from '../../utils/validation';

const SignUp = ({ open, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [userNameError, setUserNameError] = useState('');


  
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
      setPassword('');
      setEmail('');
      setUserName('');
      onClose();
    } catch (err) {
      console.error('Error during Sign Up:', err);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} >
      <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold' }}>Sign Up</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" alignItems="center" spacing={2} sx={{ maxWidth: '400px' }}>
          <TextField
            id="outlined-userName"
            label="User Name"
            variant="outlined"
            value={userName}
            onChange={(ev) => setUserName(ev.target.value)}
            error={!!userNameError}
            helperText={userNameError}
            fullWidth
            margin="normal"
          />
          <TextField
            id="outlined-email"
            label="Email"
            variant="outlined"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
            error={!!emailError}
            helperText={emailError}
            fullWidth
            margin="normal"
          />
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
            margin="normal"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}  variant="outlined" sx={{ marginRight: 3 }}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary"sx={{ marginRight: 2 }}>
          Sign Up
        </Button>
      </DialogActions>
      <Box sx={{ textAlign: 'center', marginTop: 2, marginBottom: 2 }}> 
          <Link
             onClick={onClose}
            to="/chef-sign-up" // Directs to the chef sign-up page
          >
            sign up as a chef
          </Link>
      </Box>
    </Dialog>
  );
};

export default SignUp;
