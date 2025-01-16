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
import Succes from '../../components/succes/Succes';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const ChefSignUpForm = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [yearsOfExperience, setYearsOfExperience] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [aboutMe, setAboutMe] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [userNameError, setUserNameError] = useState('');
  const [yearsOfExperienceError, setYearsOfExperienceError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [aboutMeError, setAboutMeError] = useState('');
  const [openSuccess, setOpenSuccess] = useState(false);

  const { setUser, setToken } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    // Reset error messages
    setEmailError('');
    setPasswordError('');
    setUserNameError('');
    setYearsOfExperienceError('');
    setPhoneNumberError('');
    setAboutMeError('');

    // Validate fields
    const userNameErrorMsg = validateUserName(userName);
    const emailErrorMsg = validateEmail(email);
    const passwordErrorMsg = validatePassword(password);
    const yearsErrorMsg = validateYearsOfExperience(yearsOfExperience);
    const phoneErrorMsg = validatephoneNumber(phoneNumber);
    const aboutMeErrorMsg = validateAboutMe(aboutMe);

    // Set error messages
    setUserNameError(userNameErrorMsg);
    setEmailError(emailErrorMsg);
    setPasswordError(passwordErrorMsg);
    setYearsOfExperienceError(yearsErrorMsg);
    setPhoneNumberError(phoneErrorMsg);
    setAboutMeError(aboutMeErrorMsg);

    if (!userNameErrorMsg && !emailErrorMsg && !passwordErrorMsg && !yearsErrorMsg && !phoneErrorMsg && !aboutMeErrorMsg) {
      try {
        const chefData = {
          userName,
          email,
          password,
          yearsOfExperience: parseInt(yearsOfExperience, 10),
          phoneNumber,
          aboutMe,
          type: 'chef',
        };

        // Add chef to the database
        await addChefToDb(chefData);

        // Show success message
        setOpenSuccess(true);

        // Automatically log in the user
        const response = await signIn(email, password);
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
      }
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper
        elevation={3}
        sx={{
          p: { xs: 2, md: 6 },
          backgroundColor: '#ffffff',
          borderRadius: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mb: 4,
          }}
        >
          <RestaurantIcon
            sx={{
              fontSize: 40,
              mb: 2,
              color: '#939185',
            }}
          />
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: 600,
              color: '#2C3E50',
              mb: 1,
            }}
          >
            Join as a Chef
          </Typography>
          <Typography variant="body1" sx={{ color: '#7F8C8D', mb: 3 }}>
            Fill in the following details to start sharing your recipes.
          </Typography>
          <Divider sx={{ width: '100%', mb: 4 }} />
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: 2,
            }}
          >
            <TextField
              label="User Name"
              variant="outlined"
              fullWidth
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              error={!!userNameError}
              helperText={userNameError}
              required
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!emailError}
              helperText={emailError}
              required
            />
          </Box>

          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!passwordError}
            helperText={passwordError}
            required
          />

          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: 2,
            }}
          >
            <TextField
              label="Years of Experience"
              variant="outlined"
              fullWidth
              type="number"
              value={yearsOfExperience}
              onChange={(e) => setYearsOfExperience(e.target.value)}
              error={!!yearsOfExperienceError}
              helperText={yearsOfExperienceError}
              required
            />
            <TextField
              label="Phone Number"
              variant="outlined"
              fullWidth
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              error={!!phoneNumberError}
              helperText={phoneNumberError}
              required
            />
          </Box>

          <TextField
            label="Tell us a bit about yourself"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={aboutMe}
            onChange={(e) => setAboutMe(e.target.value)}
            error={!!aboutMeError}
            helperText={aboutMeError}
            required
          />

          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
              mt: 2,
              py: 1.5,
              backgroundColor: '#939185',
              '&:hover': {
                backgroundColor: '#7a796f',
              },
              fontSize: '1.1rem',
            }}
          >
            Sign Up
          </Button>
        </Box>
      </Paper>

      <Succes
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
