import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { useNavigate } from 'react-router-dom';
import SignUp from '../../components/sign-up/SignUp';  // הוספת הקומפוננטה לפופאאוט
import SignIn from '../../pages/sign-in-page/SignInPage'
const pages = ['About Us', 'Our Chefs'];

function ResponsiveAppBar() {
  const [popupOpenSignUp, setPopupOpenSignUp] = React.useState(false); // מצב הפופאאוט
  const [popupOpenSignIn, setPopupOpenSignIn] = React.useState(false); // מצב הפופאאוט

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

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor:"#E6B9A6" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <RestaurantIcon sx={{ display: { xs: 'none', md: 'flex' ,color: '#2F3645'}, mr: 4 }} />
            <Button
              onClick={onButtonHome}
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                fontSize: "1.4rem",
                letterSpacing: '.3rem',
                color: "#2F3645",
                textDecoration: 'none'
              }}
            >
              RECIPES FOR YOU!
            </Button>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button key={page} sx={{ my: 2, color: '#2F3645', display: 'block' }}>
                  {page}
                </Button>
              ))}
            </Box>

           
            <Button 
              variant="contained" 
              onClick={openPopupSignUp} 
            >
              Sign Up
            </Button>
            <Button 
              variant="inline" 
              onClick={openPopupSignIn} 
            >
              Sign In
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
      <SignUp open={popupOpenSignUp} onClose={closePopupSignUp} />
      <SignIn open={popupOpenSignIn} onClose={closePopupSignIn} />

    </>
  );
}

export default ResponsiveAppBar;
