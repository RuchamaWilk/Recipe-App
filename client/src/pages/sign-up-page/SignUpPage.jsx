
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {addChefToDb} from '../../services/apiService'
import TextField from '@mui/material/TextField';
import LoginIcon from '@mui/icons-material/Login';
import { Button } from '@mui/material';
import { Typography ,Box} from '@mui/material';

const SignUpPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userName, setUserName]= useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [userNameError, setUserNameError] = useState('')

  const navigate = useNavigate()

  const  onButtonClick =async () => {
    setEmailError('')
    setPasswordError('')
    if (userName=== ''){
        setUserNameError('please enter user name')
        return
    }
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
  try{
    console.log("addChefToDb");
    await addChefToDb(userName,email, password);


  }catch(err){
    console.error('Error during Sign Up:', error);
  }
  
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center"> 
      <Typography variant="h4" component="h1" gutterBottom> Sign Up</Typography>
        <TextField id="outlined-basic" label="user name" variant="outlined" 
            value={userName}
            onChange={(ev) => setUserName(ev.target.value)}
          />
        <Typography variant="body1" color="error">{userNameError}</Typography>

        <TextField id="outlined-basic" label="email" variant="outlined" 
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
        />
        <Typography variant="body1" color="error">{emailError}</Typography>
        <TextField id="outlined-basic" label="password" variant="outlined" 
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
        <Typography variant="body1" color="error">{passwordError}</Typography>
        <Button onClick={onButtonClick} variant="contained">
          <LoginIcon />Sign Up
        </Button>
      </Box>
  )
}

export default SignUpPage

