import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {checkChef} from '../../services/apiService'
import TextField from '@mui/material/TextField';
import LoginIcon from '@mui/icons-material/Login';
import { Button } from '@mui/material';
import { Typography ,Box} from '@mui/material';




const LogInPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const navigate = useNavigate()

  const  onButtonClick =async () => {
    setEmailError('')
    setPasswordError('')

  // Check if the user has entered both fields correctly
  if ('' === email) {
    setEmailError('Please enter your email')
    return
  }

  if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    setEmailError('Please enter a valid email')
    return
  }

  if ('' === password) {
    setPasswordError('Please enter a password')
    return
  }

  if (password.length < 7) {
    setPasswordError('The password must be 8 characters or longer')
    return
  }
  console.log("loginPage" ,email)
  try {
        const response =await checkChef(email, password); // קריאה לפונקציה שתשלח את הנתונים לשרת
        if (response.success) {
        navigate('/'); // Navigate to home page on success
        } else {
        setLoginError(response.message);
        }
    } catch (error) {
        console.error('Error during login:', error);
    }
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center"> 
      <Typography variant="h4" component="h1" gutterBottom> Log In</Typography>
      <br />
        <TextField id="outlined-basic" label="email" variant="outlined" 
            value={email}
            placeholder="Enter your email here"
            onChange={(ev) => setEmail(ev.target.value)}
        />
           <Typography variant="body1" color="error">{emailError}</Typography>
      <br />     
        <TextField id="outlined-basic" label="password" variant="outlined" 
            value={password}
            placeholder="Enter your password here"
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <Typography variant="body1" color="error">{passwordError}</Typography>
      <br />
        <Button onClick={onButtonClick} variant="contained">
          <LoginIcon />Log in
        </Button>
      </Box>
  )
}

export default LogInPage