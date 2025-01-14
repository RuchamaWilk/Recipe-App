import React, { useState } from 'react';
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
import { useUser } from '../../providers/UserProvider';

const pages = ['About Us', 'Our Chefs'];

function ResponsiveAppBar() {
const [popupOpenSignUp, setPopupOpenSignUp] = useState(false);
const [popupOpenSignIn, setPopupOpenSignIn] = useState(false);
const [anchorEl, setAnchorEl] = useState(null);
const { user, setUser, token, setToken } = useUser();
const navigate = useNavigate();

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
  localStorage.removeItem('user');
  setToken(null);
  setUser(null);
  handleMenuClose();
  navigate('/');
};

const handleAdd = () => {
  handleMenuClose();
  navigate('/add-recipe');
};

const handleFavorites = () => {
  handleMenuClose();
  navigate(`/favorite/${user._id}`);
};

const handleViewProfile = () => {
  handleMenuClose();
  navigate(`/profile/${user._id}`);
};

const handleMenuOpen = (event) => {
  setAnchorEl(event.currentTarget);
};

const handleMenuClose = () => {
  setAnchorEl(null);
};

const loggedInPages = user?.type === 'chef'
  ? [
      { name: 'Add Recipe', action: handleAdd },
    ]
  : [
      { name: 'My Favorites', action: handleFavorites },
    ];

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

          <Box sx={{ flexGrow: 1, display: 'flex' }}>
            {pages.map((page) => (
              <Button
                key={page}
                sx={{ my: 2, color: '#939185', display: 'block' }}
              >
                {page}
              </Button>
            ))}
            {user && (
              loggedInPages.map((item) => (
                <Button
                  key={item.name}
                  sx={{ my: 2, color: '#939185', display: 'block' }}
                  onClick={item.action}
                >
                  {item.name}
                </Button>
              ))
            )}
          </Box>

          {user ? (
            <Box>
              <Avatar
                sx={{ bgcolor: '#939185', cursor: 'pointer' }}
                onClick={handleMenuOpen}
              >
                {user.userName.charAt(0).toUpperCase()}
              </Avatar>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem /*onClick={handleViewProfile}*/>
                  <Typography textAlign="center">View My Profile</Typography>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <Typography textAlign="center">Log Out</Typography>
                </MenuItem>
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
    <SignIn open={popupOpenSignIn} onClose={closePopupSignIn} />
  </>
);
}

export default ResponsiveAppBar;
