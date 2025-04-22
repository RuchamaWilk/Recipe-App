import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Dialog, Box, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import ChefHatIcon from '@mui/icons-material/Restaurant'; // Using Restaurant icon as a substitute for ChefHat
import { addUserToDb, signIn } from '../../services/apiService';
import { validateUserName, validateEmail, validatePassword } from '../../utils/validation';
import TimedAleart from '../timed-aleart/TimedAleart';
import { useUser } from '../../providers/UserProvider';
import './SignUp.css';

const SignUp = ({ open, onClose }) => {
  const navigate = useNavigate();
  const { setToken, setUser } = useUser();
  const [openSuccess, setOpenSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    userName: '',
    email: '',
    password: ''
  });

  const handleInputChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
    
    // Clear field error when typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
    
    // Clear general error message when typing
    if (errorMessage) {
      setErrorMessage('');
    }
  };

  const resetForm = () => {
    setFormData({
      userName: '',
      email: '',
      password: ''
    });
    setErrors({
      userName: '',
      email: '',
      password: ''
    });
    setErrorMessage('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const validateForm = () => {
    const newErrors = {
      userName: validateUserName(formData.userName),
      email: validateEmail(formData.email),
      password: validatePassword(formData.password)
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      await addUserToDb(formData.userName, formData.email, formData.password);
      const response = await signIn(formData.email, formData.password);
      const { user, token } = response;

      setUser(user);
      setToken(token);
      setOpenSuccess(true);

      setTimeout(() => {
        setOpenSuccess(false);
        handleClose();
        navigate('/');
      }, 2500);
    } catch (err) {
      console.error('Error during Sign Up:', err);
      setErrorMessage(err.message || 'Sign up failed. Please try again.');
    }
  };

  const inputFields = [
    { id: 'userName', label: 'User Name', type: 'text' },
    { id: 'email', label: 'Email', type: 'text' },
    { id: 'password', label: 'Password', type: 'password' }
  ];

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      onClick={(e) => e.stopPropagation()}
      PaperProps={{
        className: 'signup-dialog-paper'
      }}
    >
      <Box className="signup-container">
        <RestaurantIcon className="signup-icon" />
        <Typography variant="h5" className="signup-title">
          Sign Up
        </Typography>

        {inputFields.map((field) => (
          <TextField
            key={field.id}
            className="signup-input-field"
            label={field.label}
            variant="outlined"
            type={field.type}
            value={formData[field.id]}
            onChange={handleInputChange(field.id)}
            error={!!errors[field.id]}
            helperText={errors[field.id]}
            required
            fullWidth
            InputProps={{
              sx: {
                borderRadius: '10px',
              }
            }}
          />
        ))}

        <Button
          onClick={handleSubmit}
          variant="contained"
          fullWidth
          className="signup-button"
        >
          Sign Up
        </Button>
        
        {errorMessage && (
          <Typography className="signup-error-message">
            {errorMessage}
          </Typography>
        )}

        <Box className="bottom-row">
          <Box className="chef-signup-container">
            <ChefHatIcon className="chef-icon" />
            <Typography variant="body2" className="signup-chef">
              <Link
                to="/chef-sign-up"
                onClick={handleClose}
                className="signin-link"
              >
                Join as a Chef
              </Link>
            </Typography>
          </Box>
          
          <Button
            onClick={handleClose}
            variant="outlined"
            className="cancel-button"
          >
            Cancel
          </Button>
        </Box>
      </Box>

      <TimedAleart
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