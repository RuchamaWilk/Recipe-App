import React, { useState } from 'react';
import { Button, TextField, Typography, Box, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
//import { addChefToDb } from '../../services/apiService'; // שירות ה-API שלך

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

    // בדיקת השדות
    if (userName === '') {
      setUserNameError('Please enter your username');
      return;
    }
    if (email === '') {
      setEmailError('Please enter your email');
      return;
    }
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError('Please enter a valid email');
      return;
    }
    if (password === '') {
      setPasswordError('Please enter your password');
      return;
    }
    if (password.length < 7) {
      setPasswordError('Password must be at least 8 characters long');
      return;
    }
    if (yearsOfExperience === '') {
      setYearsOfExperienceError('Please enter your years of experience');
      return;
    }
    if (phoneNumber === '') {
      setPhoneNumberError('Please enter your phone number');
      return;
    }

    try {
      const chefData = {
        userName,
        emailAddress: email,
        password,
        yearsOfExperience: parseInt(yearsOfExperience),
        phoneNumber,
        aboutMe,
        type: 'chef',
      };
      //await addChefToDb(chefData); // קריאה לשירות API להוספת השף למסד הנתונים
      //onClose(); // סגירת הפופ-אפ אחרי ההרשמה
      //navigate('/chef-dashboard'); // דחיפה לעמוד הבית של השפים (או לעמוד אחר שתבחר)
    } catch (error) {
      console.error('Error during Chef SignUp:', error);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Sign Up As Chef
      </Typography>
      
      {/* Grid for userName, email, password in one row */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            error={!!userNameError}
            helperText={userNameError}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!emailError}
            helperText={emailError}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
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
        </Grid>
      </Grid>

      {/* Grid for yearsOfExperience and phoneNumber in one row */}
      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        <Grid item xs={12} sm={6}>
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
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Phone Number"
            variant="outlined"
            fullWidth
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            error={!!phoneNumberError}
            helperText={phoneNumberError}
          />
        </Grid>
      </Grid>

      {/* About Me */}
      <TextField
        label="About Me"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={aboutMe}
        onChange={(e) => setAboutMe(e.target.value)}
        sx={{ marginTop: 2 }}
      />
      
      <Button variant="contained" onClick={handleSubmit} sx={{ marginTop: 2 }}>
        Sign Up
      </Button>
    </Box>
  );
};

export default ChefSignUpForm;
