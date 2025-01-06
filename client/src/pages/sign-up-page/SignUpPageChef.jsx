import React, { useState } from 'react';
import { Button, TextField, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { addChefToDb } from '../../services/apiService'; // שירות ה-API שלך
import { validateUserName, validateEmail, validatePassword,validateYearsOfExperience,validatephoneNumber } from '../../utils/validation';

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

  
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setEmailError('');
    setPasswordError('');
    setUserNameError('');
    setYearsOfExperienceError('');
    setPhoneNumberError('');
    setUserNameError(validateUserName(userName));
    setEmailError(validateEmail(email));
    setPasswordError(validatePassword(password));
    setYearsOfExperienceError(validateYearsOfExperience(yearsOfExperience));
    setPhoneNumberError(validatephoneNumber(phoneNumber));
    try {
      const chefData = {
        userName,
        email,
        password,
        yearsOfExperience: parseInt(yearsOfExperience),
        phoneNumber,
        aboutMe,
        type: 'chef',
      };
      await addChefToDb(chefData); // קריאה לשירות API להוספת השף למסד הנתונים
      navigate('/');
    } catch (error) {
      console.error('Error during Chef SignUp:', error);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Sign Up As Chef
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 2, width: '100%', marginBottom: 2 }}>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          error={!!userNameError}
          helperText={userNameError}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!emailError}
          helperText={emailError}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!passwordError}
          helperText={passwordError}
        />
      </Box>

      {/* Years of Experience and Phone Number in the same row */}
      <Box sx={{ display: 'flex', gap: 2, width: '100%', marginBottom: 2 }}>
        <TextField
          label="Years of Experience"
          variant="outlined"
          fullWidth
          type="number"
          value={yearsOfExperience}
          onChange={(e) => setYearsOfExperience(e.target.value)}
          error={!!yearsOfExperienceError}
          helperText={yearsOfExperienceError}
        />
        <TextField
          label="Phone Number"
          variant="outlined"
          fullWidth
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          error={!!phoneNumberError}
          helperText={phoneNumberError}
        />
      </Box>

      {/* About Me */}
      <TextField
        label="About Me"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={aboutMe}
        onChange={(e) => setAboutMe(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      
      <Button variant="contained" onClick={handleSubmit}>
        Sign Up
      </Button>
    </Box>
  );
};

export default ChefSignUpForm;
