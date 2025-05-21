import { useState, useRef } from 'react';
import { signIn } from '../services/apiService';
import { validateEmail, validatePassword } from '../utils/validation';
import { useUser } from '../providers/UserProvider';
import { useNavigate } from 'react-router-dom';

/**
 * Custom hook for sign-in form logic
 */
export const useSignIn = (onClose) => {
  // Refs
  const passwordRef = useRef();
  
  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Error states
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [signInError, setSignInError] = useState('');
  
  // User context and navigation
  const { login } = useUser();
  const navigate = useNavigate();

  // Form reset functions
  const resetText = () => {
    setEmail('');
    setPassword('');
  };

  const resetError = () => {
    setEmailError('');
    setPasswordError('');
    setSignInError('');
  };
  
  // Handle dialog close
  const handleClose = () => {
    resetText();
    resetError();
    onClose();
  };
  
  // Handle key press events
  const handleKeyDown = (e, fieldId) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (fieldId === 'email') {
        passwordRef.current?.focus();
      } else if (fieldId === 'password') {
        handleSignIn();
      }
    }
  };

  // Form submission
  const handleSignIn = async () => {
    resetError();
    setEmailError(validateEmail(email));
    setPasswordError(validatePassword(password));
    
    if (validatePassword(password) !== '' || validateEmail(email) !== '') {
      return;
    }

    try {
      const response = await signIn(email, password);
      if (response.token) {
        login(response.token, response.user);
        navigate('/');
        handleClose();
      }
    } catch (error) {
      console.error('Error during login:', error);
      setSignInError(error.message);
    }
  };

  // Define form fields configuration
  const formFields = [
    {
      id: "email",
      label: "Email",
      value: email,
      onChange: (ev) => setEmail(ev.target.value),
      error: emailError,
      onKeyDown: (e) => handleKeyDown(e, 'email')
    },
    {
      id: "password",
      label: "Password",
      value: password,
      onChange: (ev) => setPassword(ev.target.value),
      error: passwordError,
      type: "password",
      inputRef: passwordRef,
      onKeyDown: (e) => handleKeyDown(e, 'password')
    }
  ];

  return {
    email,
    password,
    emailError,
    passwordError,
    signInError,
    formFields,
    passwordRef,
    handleSignIn,
    handleClose,
    handleKeyDown
  };
};