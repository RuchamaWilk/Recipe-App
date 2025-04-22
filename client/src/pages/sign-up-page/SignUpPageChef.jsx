import React, { useState } from 'react';
import {
  Button,
  TextField,
  Typography,
  Box,
  Paper,
  Container,
  Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { addChefToDb } from '../../services/apiService';
import {
  validateUserName,
  validateEmail,
  validatePassword,
  validateYearsOfExperience,
  validatephoneNumber,
  validateAboutMe,
} from '../../utils/validation';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { signIn } from '../../services/apiService';
import { useUser } from '../../providers/UserProvider';
import TimedAleart from '../../components/timed-aleart/TimedAleart';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import './ChefSignUp.css'; // You'll need to create this CSS file

const ChefSignUpForm = () => {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    yearsOfExperience: '',
    phoneNumber: '',
    aboutMe: ''
  });
  
  const [errors, setErrors] = useState({
    userName: '',
    email: '',
    password: '',
    yearsOfExperience: '',
    phoneNumber: '',
    aboutMe: ''
  });
  
  const [openSuccess, setOpenSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { setUser, setToken } = useUser();
  const navigate = useNavigate();

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

  const validateForm = () => {
    const newErrors = {
      userName: validateUserName(formData.userName),
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
      yearsOfExperience: validateYearsOfExperience(formData.yearsOfExperience),
      phoneNumber: validatephoneNumber(formData.phoneNumber),
      aboutMe: validateAboutMe(formData.aboutMe)
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      const chefData = {
        userName: formData.userName,
        email: formData.email,
        password: formData.password,
        yearsOfExperience: parseInt(formData.yearsOfExperience, 10),
        phoneNumber: formData.phoneNumber,
        aboutMe: formData.aboutMe,
        type: 'chef',
      };

      // Add chef to the database
      await addChefToDb(chefData);

      // Show success message
      setOpenSuccess(true);

      // Automatically log in the user
      const response = await signIn(formData.email, formData.password);
      const { user, token } = response;

      // Update user context
      setUser(user);
      setToken(token);

      // Navigate to home page
      setTimeout(() => {
        setOpenSuccess(false);
        navigate('/');
      }, 2500);
    } catch (error) {
      console.error('Error during Chef SignUp:', error);
      setErrorMessage(error.message || 'Sign up failed. Please try again.');
    }
  };

  return (
    <Container maxWidth="md" className="chef-signup-outer-container">
      <Paper
        elevation={3}
        className="chef-signup-paper"
      >
        <Box className="chef-signup-container">
          <RestaurantIcon className="chef-signup-icon" />
          <Typography variant="h4" className="chef-signup-title">
            Join as a Chef
          </Typography>
          <Typography variant="body1" className="chef-signup-subtitle">
            Fill in the following details to start sharing your recipes.
          </Typography>
          <Divider className="chef-signup-divider" />
        </Box>

        <Box className="chef-signup-form">
          <Box className="chef-signup-row">
            <TextField
              label="User Name"
              variant="outlined"
              fullWidth
              value={formData.userName}
              onChange={handleInputChange('userName')}
              error={!!errors.userName}
              helperText={errors.userName}
              required
              className="chef-signup-input-field"
              InputProps={{
                sx: {
                  borderRadius: '10px',
                }
              }}
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={formData.email}
              onChange={handleInputChange('email')}
              error={!!errors.email}
              helperText={errors.email}
              required
              className="chef-signup-input-field"
              InputProps={{
                sx: {
                  borderRadius: '10px',
                }
              }}
            />
          </Box>

          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={formData.password}
            onChange={handleInputChange('password')}
            error={!!errors.password}
            helperText={errors.password}
            required
            className="chef-signup-input-field"
            InputProps={{
              sx: {
                borderRadius: '10px',
              }
            }}
          />

          <Box className="chef-signup-row">
            <TextField
              label="Years of Experience"
              variant="outlined"
              fullWidth
              type="number"
              value={formData.yearsOfExperience}
              onChange={handleInputChange('yearsOfExperience')}
              error={!!errors.yearsOfExperience}
              helperText={errors.yearsOfExperience}
              required
              className="chef-signup-input-field"
              InputProps={{
                sx: {
                  borderRadius: '10px',
                }
              }}
            />
            <TextField
              label="Phone Number"
              variant="outlined"
              fullWidth
              value={formData.phoneNumber}
              onChange={handleInputChange('phoneNumber')}
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber}
              required
              className="chef-signup-input-field"
              InputProps={{
                sx: {
                  borderRadius: '10px',
                }
              }}
            />
          </Box>

          <TextField
            label="Tell us a bit about yourself"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={formData.aboutMe}
            onChange={handleInputChange('aboutMe')}
            error={!!errors.aboutMe}
            helperText={errors.aboutMe}
            required
            className="chef-signup-input-field"
            InputProps={{
              sx: {
                borderRadius: '10px',
              }
            }}
          />

          {errorMessage && (
            <Typography className="chef-signup-error-message">
              {errorMessage}
            </Typography>
          )}

          <Button
            variant="contained"
            onClick={handleSubmit}
            className="chef-signup-button"
            startIcon={<CheckCircleIcon />}
          >
            Sign Up as Chef
          </Button>
          
          <Button
            variant="outlined"
            onClick={() => navigate('/')}
            className="chef-signup-cancel-button"
          >
            Cancel
          </Button>
        </Box>
      </Paper>

      <TimedAleart
        open={openSuccess}
        onClose={() => setOpenSuccess(false)}
        title="Success"
        message="You're now one of our chefs!"
        icon={<CheckCircleIcon color="success" fontSize="large" />}
      />
    </Container>
  );
};

export default ChefSignUpForm;