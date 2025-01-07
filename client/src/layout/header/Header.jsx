//client//src/layout/heder/Header
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { useNavigate } from 'react-router-dom';
import SignUp from '../../components/sign-up/SignUp';
import SignIn from '../../pages/sign-in-page/SignInPage';
import { Avatar } from '@mui/material';

const pages = ['About Us', 'Our Chefs'];

function ResponsiveAppBar() {
  const [popupOpenSignUp, setPopupOpenSignUp] = React.useState(false);
  const [popupOpenSignIn, setPopupOpenSignIn] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [email,setEmail]= React.useState('');
  
  const navigate = useNavigate();

  React.useEffect(() => {
    // בדיקה אם יש טוקן ב-localStorage
    const token = localStorage.getItem('token');
    if (token) {
      setEmail(email)
      setIsLoggedIn(true); // אם יש טוקן, המשתמש מחובר
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
    localStorage.removeItem('token'); // להסיר את הטוקן ב-`localStorage`
    setEmail('');
    setIsLoggedIn(false);  // עדכון המצב אחרי יציאה
    navigate('/');  // חזרה לדף הבית
  };

  const handleLogin = (email, token) => {
    setIsLoggedIn(true); // עדכון המצב של התחברות
    setEmail(email)
    localStorage.setItem('token', token); // שמירת הטוקן ב-localStorage
    navigate('/');  // חזרה לדף הבית אחרי התחברות
  };

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: /*'white'*/"#E6B9A6" }}>
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

            {/* אם המשתמש מחובר, הראה את האייקון עם האות הראשונה משם המשתמש */}
            {isLoggedIn ? (
              <>
                <Avatar sx={{ bgcolor: "#2F3645" }}>
                  {email.charAt(0).toUpperCase()}
                </Avatar>
                <Button
                  variant="contained"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
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
              </>
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
