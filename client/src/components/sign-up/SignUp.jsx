import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { addUserToDb } from '../../services/apiService';
import TextField from '@mui/material/TextField';
import { Button, Dialog, Box, Typography } from '@mui/material';
import { validateUserName, validateEmail, validatePassword } from '../../utils/validation';
import Succes from '../../components/succes/Succes';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const SignUp = ({ open, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [userNameError, setUserNameError] = useState('');
  const [openSuccess, setOpenSuccess] = useState(false);

  const navigate = useNavigate();

  const handleDialogClick = (e) => {
    e.stopPropagation();
  };

  const handleClose = () => {
    setEmailError('');
    setPasswordError('');
    setUserNameError('');
    setUserName('');
    setEmail('');
    setPassword('');
    onClose();
  };

  const handleSubmit = async () => {
    const userNameValidation = validateUserName(userName);
    const emailValidation = validateEmail(email);
    const passwordValidation = validatePassword(password);

    setUserNameError(userNameValidation);
    setEmailError(emailValidation);
    setPasswordError(passwordValidation);

    if (userNameValidation || emailValidation || passwordValidation) {
      return; // אם יש שגיאות, לא ממשיכים
    }

    try {
      await addUserToDb(userName, email, password);
      setOpenSuccess(true);

      setTimeout(() => {
        setOpenSuccess(false);
        handleClose();
        navigate('/');
      }, 2500);

      
    } catch (err) {
      console.error('Error during Sign Up:', err);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      onClick={handleDialogClick}
 
      PaperProps={{
        sx: {
          padding: 4,
          borderRadius: 3,
          width: '400px',
        },
      }}
    >
      <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#2F3645' }}>
          Sign Up
        </Typography>

        <TextField
          label="User Name"
          variant="outlined"
          value={userName}
          onChange={(ev) => setUserName(ev.target.value)}
          error={!!userNameError}
          helperText={userNameError}
          required
          fullWidth
        />

        <TextField
          label="Email"
          variant="outlined"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
          error={!!emailError}
          helperText={emailError}
          required
          fullWidth
        />

        <TextField
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
          error={!!passwordError}
          helperText={passwordError}
          required
          fullWidth
        />

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
          <Typography variant="body2" sx={{ color: '#4A5367', marginTop: 2 }}>
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

      <Succes
        open={openSuccess}
        onClose={() => setOpenSuccess(false)}
        title="Success!"
        message="You have signed up successfully!"
        icon={<CheckCircleIcon color="success" fontSize="large" />}
      />
    </Dialog>
  );
};

export default SignUp;
