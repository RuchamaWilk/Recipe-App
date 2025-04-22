import React, { useState } from 'react';
import {
  AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem, Drawer, List,
  ListItem, ListItemText, ListItemIcon, Divider, alpha,
} from '@mui/material';
import {
  Menu as MenuIcon, Restaurant as RestaurantIcon, Favorite as FavoriteIcon, AddCircle as AddCircleIcon,
  Person as PersonIcon, Logout as LogoutIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import SignUp from '../../components/sign-up/SignUp';
import SignIn from '../../components/sign-in/SignIn';
import { useUser } from '../../providers/UserProvider';
import './header.css';  // הכנסת הסטיילים מתוך ה-CSS
import AlertDialog from '../../components/alert-dialog/AlertDialog';

function ModernHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [openSignUp, setOpenSignUp] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [openAlertDialog, setOpenAlertDialog] = useState(false);

  const navigate = useNavigate();
  const { user, logout } = useUser();
  console.log("user" ,user);

  const pages = [
    { text: 'About Us', path: '/about-us' },
    { text: 'Our Chefs', path: '/our-chefs' },
  ];

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  function handleLogout() {
    setOpenAlertDialog(true);
  }

  const confirmLogout = () => {
    handleCloseUserMenu();
    logout();
    navigate('/');
  };

  const drawer = (
    <Box sx={{ width: 280 }} role="presentation">
      <List>
        <ListItem
          sx={{
            justifyContent: 'center',
            py: 3,
            backgroundColor: '#939185',
            color: 'white',
          }}
        >
          <RestaurantIcon sx={{ mr: 1 }} />
          <Typography variant="h6" noWrap component="div" onClick={() => navigate('/')}>
            GOOD FOOD
          </Typography>
        </ListItem>
        <Divider />
        {pages.map((page) => (
          <ListItem
            button
            key={page.text}
            onClick={() => {
              navigate(page.path);
              handleDrawerToggle();
            }}
            sx={{
              py: 1.5,
              '&:hover': {
                backgroundColor: alpha('#939185', 0.1),
              },
            }}
          >
            <ListItemText
              primary={page.text}
              sx={{
                color: '#939185',
                '& .MuiTypography-root': {
                  fontWeight: 500,
                },
              }}
            />
          </ListItem>
        ))}
        {user ? (
          <React.Fragment>
            <Divider sx={{ my: 2 }} />
            {user?._doc.type === 'chef' && (
              <ListItem
                button
                onClick={() => {
                  navigate(`/chef/${user._doc_id}`);
                  handleDrawerToggle();
                }}
              >
                <ListItemIcon sx={{ color: '#939185' }}>
                  <AddCircleIcon />
                </ListItemIcon>
                <ListItemText primary="My recipe" />
              </ListItem>
            )}
            <ListItem
              button
              onClick={() => {
                navigate(`/favorite/${user._doc._id}`);
                handleDrawerToggle();
              }}
            >
              <ListItemIcon sx={{ color: '#939185' }}>
                <FavoriteIcon />
              </ListItemIcon>
              <ListItemText primary="My Favorites" />
            </ListItem>
            <Divider sx={{ my: 2 }} />
            <ListItem
              button
              onClick={handleLogout}
              sx={{
                py: 1.5,
                '&:hover': {
                  backgroundColor: alpha('#939185', 0.1),
                },
              }}
            >
              <ListItemIcon sx={{ color: '#939185' }}>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Divider sx={{ my: 2 }} />
            <ListItem
              button
              onClick={() => {
                setOpenSignUp(true);
                handleDrawerToggle();
              }}
              sx={{
                py: 1.5,
                '&:hover': {
                  backgroundColor: alpha('#939185', 0.1),
                },
              }}
            >
              <ListItemText primary="Sign Up" sx={{ color: '#939185' }} />
            </ListItem>
            <ListItem
              button
              onClick={() => {
                setOpenSignIn(true);
                handleDrawerToggle();
              }}
              sx={{
                py: 1.5,
                '&:hover': {
                  backgroundColor: alpha('#939185', 0.1),
                },
              }}
            >
              <ListItemText primary="Sign In" sx={{ color: '#939185' }} />
            </ListItem>
          </React.Fragment>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="fixed" className="appBar">
        <Container maxWidth="xl">
          <Toolbar disableGutters className="toolbar">
           

            <RestaurantIcon className="restaurantIcon" />

            <Typography
              variant="h6"
              noWrap
              component="a"
              onClick={() => navigate('/')}
              className="logo"
            >
              GOOD FOOD
            </Typography>

            <Box className="navLinks">
              {pages.map((page) => (
                <Button
                  key={page.text}
                  onClick={() => navigate(page.path)}
                  className="navButton"
                >
                  {page.text}
                </Button>
              ))}

              {user && (
                <>
                  {user?._doc.type === 'chef' && (
                    <Button
                      startIcon={<AddCircleIcon />}
                      onClick={() => navigate(`/chef/${user._doc._id}`)}
                      className="navButton"
                    >
                      My Recipes
                    </Button>
                  )}
                  <Button
                    startIcon={<FavoriteIcon />}
                    onClick={() => navigate(`/favorite/${user._doc._id}`)}
                    className="navButton"
                  >
                    My Favorites
                  </Button>
                </>
              )}
            </Box>

            {user ? (
              <Box sx={{ flexShrink: 0 }}>
                <Tooltip title="Open menu">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      sx={{
                        bgcolor: '#939185',
                        width: 40,
                        height: 40,
                      }}
                    >
                      {user._doc.userName.charAt(0).toUpperCase()}
                    </Avatar>
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                  PaperProps={{
                    elevation: 2,
                    sx: {
                      minWidth: 200,
                      mt: 1.5,
                    },
                  }}
                >
                  <MenuItem
                    onClick={handleLogout}
                    className="logoutButton"
                  >
                    <ListItemIcon className="userMenuIcon">
                      <LogoutIcon />
                    </ListItemIcon>
                    <Typography>Logout</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              <Box
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  gap: 1.5,
                  alignItems: 'center',
                }}
              >
                <Button
                  variant="contained"
                  onClick={() => setOpenSignUp(true)}
                  className="signUpButton"
                >
                  Sign Up
                </Button>

                <Button
                  variant="outlined"
                  onClick={() => setOpenSignIn(true)}
                  className="signInButton"
                >
                  Sign In
                </Button>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 280,
            boxShadow: '4px 0 8px rgba(0,0,0,0.1)',
          },
        }}
      >
        {drawer}
      </Drawer>
      <SignUp open={openSignUp} onClose={() => setOpenSignUp(false)} />
      <SignIn open={openSignIn} onClose={() => setOpenSignIn(false)} />
      <AlertDialog
        open={openAlertDialog}
        onClose={() => setOpenAlertDialog(false)}
        onConfirm={confirmLogout}
      />
    </>
  );
}

export default ModernHeader;
