import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { useNavigate } from 'react-router-dom';
import SignUp from '../../components/sign-up/SignUp';  // הוספת הקומפוננטה לפופאאוט

const pages = ['About Us', 'Our Chefs'];

function ResponsiveAppBar() {
  const [isPopupOpen, setIsPopupOpen] = React.useState(false); // מצב הפופאאוט
  const navigate = useNavigate();

  const onButtonHome = () => {
    navigate('/');
  };

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
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

            {/* כפתור הרשמה */}
            <Button 
              variant="contained" 
              onClick={openPopup} 
            >
              Sign Up
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
      <SignUp open={isPopupOpen} onClose={closePopup} />
    </>
  );
}

export default ResponsiveAppBar;
