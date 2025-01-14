import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { useNavigate } from 'react-router-dom';
import SignUp from '../../components/sign-up/SignUp';
import SignIn from '../../pages/sign-in-page/SignInPage';
import { Avatar, Menu, MenuItem, Typography } from '@mui/material';
import { jwtDecode } from 'jwt-decode';

const pages = ['About Us', 'Our Chefs'];

function ResponsiveAppBar() {
  const [popupOpenSignUp, setPopupOpenSignUp] = useState(false);
  const [popupOpenSignIn, setPopupOpenSignIn] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [userType, setUserType] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setEmail(decodedToken.emailAddress);
      setUserType(decodedToken.type);
      setIsLoggedIn(true);
    }
  }, []);

  const onButtonHome = () => {
    navigate('/');
  };

  const openPopupSignUp = () => {
    setPopupOpenSignUp(true);
  };

  const closePopupSignUp = () => {
    setPopupOpenSignUp(false);
  };

  const openPopupSignIn = () => {
    setPopupOpenSignIn(true);
  };

  const closePopupSignIn = () => {
    setPopupOpenSignIn(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setEmail('');
    setIsLoggedIn(false);
    setUserType('');
    handleMenuClose();
    navigate('/');
  };

  const handleAdd = () => {
    handleMenuClose();
    navigate('/add-recipe');
  };

  const handleFavorites = () => {
    handleMenuClose();
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);

    navigate(`/favorite/${decodedToken._id}`);
  };
  
  const menuItems = userType === 'chef'
    ? [
        { text: 'Add Recipe', action: handleAdd },
        { text: 'Log Out', action: handleLogout },
      ]
    : [
        { text: 'My Favorites', action: handleFavorites },
        { text: 'Log Out', action: handleLogout },
      ];

  const handleLogin = (email, token) => {
    const decodedToken = jwtDecode(token);  // פענוח הטוקן מיד בלוגין
    setEmail(decodedToken.emailAddress);
    setUserType(decodedToken.type);         // עדכון סוג המשתמש מיד
    setIsLoggedIn(true);
    localStorage.setItem('token', token);
    navigate('/');
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: 'white' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <RestaurantIcon
              sx={{ color: '#939185', display: { xs: 'none', md: 'flex' }, mr: 4 }}
            />
            <Button
              onClick={onButtonHome}
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                fontSize: '1.4rem',
                letterSpacing: '.3rem',
                color: '#939185',
                textDecoration: 'none',
              }}
            >
              RECIPES FOR YOU!
            </Button>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button key={page} sx={{ my: 2, color: '#939185', display: 'block' }}>
                  {page}
                </Button>
              ))}
            </Box>

            {isLoggedIn ? (
              <Box>
                <Avatar
                  sx={{ bgcolor: '#939185', cursor: 'pointer' }}
                  onClick={handleMenuOpen}
                >
                  {email.charAt(0).toUpperCase()}
                </Avatar>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  {menuItems.map((item, index) => (
                    <MenuItem key={index} onClick={item.action}>
                      <Typography textAlign="center">{item.text}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: '#939185' }}
                  onClick={openPopupSignUp}
                >
                  Sign Up
                </Button>
                <Button
                  variant="text"
                  sx={{ color: '#939185' }}
                  onClick={openPopupSignIn}
                >
                  Sign In
                </Button>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <SignUp open={popupOpenSignUp} onClose={closePopupSignUp} />
      <SignIn open={popupOpenSignIn} onClose={closePopupSignIn} onLogin={handleLogin} />
    </>
  );
}

export default ResponsiveAppBar;