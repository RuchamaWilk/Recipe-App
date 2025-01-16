import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Dialog, Box, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { addUserToDb, signIn } from '../../services/apiService';
import { validateUserName, validateEmail, validatePassword } from '../../utils/validation';
import Succes from '../../components/succes/Succes';
import { useUser } from '../../providers/UserProvider';

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
        <RestaurantIcon 
          sx={{ 
            fontSize: 40, 
            color: '#939185',
            mb: 1,
            marginBottom:0
            
          }} 
        />
        <Typography 
          variant="h5" 
          sx={{ 
            fontWeight: 'bold', 
            color: '#2F3645',
            mb: 3,
            letterSpacing: '0.5px'
          }}
        >
          Sign Up
        </Typography>

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
          sx={{
            backgroundColor: '#2F3645',
            color: '#FFFFFF',
            fontWeight: 'bold',
            paddingY: 1.5,
            mt: 2,
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
    position: 'relative',
    display: 'inline-block',
    '&:hover::after': {
      width: '100%'
    }
  }}
>            
  <Link               
    to="/chef-sign-up"               
    onClick={handleClose}               
    style={{                 
      textDecoration: 'none',                 
      color: '#2F3645',                 
      fontWeight: 'bold',
      fontSize: '1rem',
      letterSpacing: '0.5px',
      position: 'relative',
      paddingBottom: '2px'
    }}             
  >               
    Join as a Chef            
  </Link>             
</Typography>
          <Button
            onClick={handleClose}
            variant="outlined"
            sx={{
              fontWeight: 'bold',
              color: '#2F3645',
              borderColor: '#2F3645',
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