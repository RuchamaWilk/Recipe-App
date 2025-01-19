import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Dialog, Box, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { addUserToDb, signIn } from '../../services/apiService';
import { validateUserName, validateEmail, validatePassword } from '../../utils/validation';
import TimedAleart from '../timed-aleart/TimedAleart';
import { useUser } from '../../providers/UserProvider';
import './SignUp.css'

const SignUp = ({ open, onClose }) => {
  const navigate = useNavigate();
  const { setToken, setUser } = useUser();
  
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

  const [openSuccess, setOpenSuccess] = useState(false);

  const handleInputChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
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
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      onClick={(e) => e.stopPropagation()}
      PaperProps={{
        sx: {
          padding: 4,
          borderRadius: 3,
          width: '400px',
        },
      }}
    >
      <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
        <RestaurantIcon className="icon"/>
        <Typography 
          variant="h5" className='sign-up-title' 
        >Sign Up</Typography>

        {['userName', 'email', 'password'].map((field) => (
          <TextField
            key={field}
            label={field === 'userName' ? 'User Name' : field.charAt(0).toUpperCase() + field.slice(1)}
            variant="outlined"
            type={field === 'password' ? 'password' : 'text'}
            value={formData[field]}
            onChange={handleInputChange(field)}
            error={!!errors[field]}
            helperText={errors[field]}
            required
            fullWidth
          />
        ))}

        <Button
          onClick={handleSubmit}
          variant="contained"
          fullWidth
          className='sign-up'
        >
          Sign Up
        </Button>

        <Box display="flex" justifyContent="space-between" width="100%">
        <Typography 
            variant="body2" 
            className='sign-up-chef'
          >            
              <Link               
                to="/chef-sign-up"               
                onClick={handleClose}
                className= 'sign-up-link'                            
              >               
                Join As a Chef            
              </Link>             
        </Typography>
          <Button
            onClick={handleClose}
            variant="outlined"
            className= 'cancel-button'                            
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