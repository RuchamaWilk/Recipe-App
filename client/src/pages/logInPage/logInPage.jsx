import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {checkChef} from '../../services/api'

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
    <div >
      <div >
        <div>Login</div>
      </div>
      <br />
      <div>
        <input
          value={email}
          placeholder="Enter your email here"
          onChange={(ev) => setEmail(ev.target.value)}
          className={'inputBox'}
        />
        <label>{emailError}</label>
      </div>
      <br />
      <div>
        <input
          value={password}
          placeholder="Enter your password here"
          onChange={(ev) => setPassword(ev.target.value)}
          className={'inputBox'}
        />
        <label>{passwordError}</label>
      </div>
      <br />
      <div>
        <input  type="button" onClick={onButtonClick} value={'Log in'} />
      </div>
    </div>
  )
}

export default LogInPage