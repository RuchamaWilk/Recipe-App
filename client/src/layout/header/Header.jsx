import React, { useState } from 'react';
import {
  AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem, Drawer, List,
  ListItem, ListItemText, ListItemIcon, Divider, alpha, useMediaQuery, useTheme
} from '@mui/material';
import {
  Menu as MenuIcon, Restaurant as RestaurantIcon, Favorite as FavoriteIcon, AddCircle as AddCircleIcon,
  Person as PersonIcon, Logout as LogoutIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import SignUp from '../../components/sign-up/SignUp';
import SignIn from '../../components/sign-in/SignIn';
import { useUser } from '../../providers/UserProvider';
import './header.css';
import AlertDialog from '../../components/alert-dialog/AlertDialog';

function ModernHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [openSignUp, setOpenSignUp] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [openAlertDialog, setOpenAlertDialog] = useState(false);

  const navigate = useNavigate();
  const { user, logout } = useUser();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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
    setOpenAlertDialog(false);
  };

  // User menu item for both drawer and desktop dropdown
  const userProfileSection = (
    <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Avatar
        sx={{
          bgcolor: '#939185',
          width: 60,
          height: 60,
          mb: 1
        }}
        src={user?._doc?.profileImage || undefined}
      >
        {!user?._doc?.profileImage && user?._doc?.userName?.charAt(0).toUpperCase()}
      </Avatar>
      <Typography variant="body1" sx={{ fontWeight: 500, color: '#939185' }}>
        {user?._doc?.userName || 'User'}
      </Typography>
    </Box>
  );

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
          <Typography 
            variant="h6" 
            noWrap 
            component="div" 
            onClick={() => {
              navigate('/');
              handleDrawerToggle();
            }}
            sx={{ cursor: 'pointer' }}
          >
            GOOD FOOD
          </Typography>
        </ListItem>
        <Divider />
        
        {/* Add user profile section at the top of drawer when on mobile */}
        {isMobile && user && userProfileSection}

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
            {user?._doc?.type === 'chef' && (
              <ListItem
                button
                onClick={() => {
                  navigate(`/chef/${user._doc?._id}`);
                  handleDrawerToggle();
                }}
              >
                <ListItemIcon sx={{ color: '#939185' }}>
                  <AddCircleIcon />
                </ListItemIcon>
                <ListItemText primary="My Recipes" />
              </ListItem>
            )}
            <ListItem
              button
              onClick={() => {
                navigate(`/favorite/${user._doc?._id}`);
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
              onClick={() => {
                handleLogout();
                handleDrawerToggle();
              }}
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
            {/* Mobile layout: Menu on left, Logo in center */}
            {isMobile && (
              <>
                {/* Left side - Menu button */}
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={handleDrawerToggle}
                  sx={{ mr: 2 }}
                >
                  <MenuIcon />
                </IconButton>
                
                {/* Center - Logo */}
                <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <RestaurantIcon className="restaurantIcon" />
                    <Typography
                      variant="h6"
                      noWrap
                      component="a"
                      onClick={() => navigate('/')}
                      className="logo"
                      sx={{ cursor: 'pointer' }}
                    >
                      GOOD FOOD
                    </Typography>
                  </Box>
                </Box>
                
                {/* Right side - Empty space for balance */}
                <Box sx={{ width: 48 }} /> {/* Same width as menu button for visual balance */}
              </>
            )}

            {/* Desktop layout: Logo & navigation on left, user menu on right */}
            {!isMobile && (
              <>
                {/* Left side - Logo and navigation */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <RestaurantIcon className="restaurantIcon" />
                  <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    onClick={() => navigate('/')}
                    className="logo"
                    sx={{ cursor: 'pointer' }}
                  >
                    GOOD FOOD
                  </Typography>
                
                  {/* Navigation buttons - only visible on desktop */}
                  <Box className="navLinks" sx={{ display: 'flex', ml: 3 }}>
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
                        {user?._doc?.type === 'chef' && (
                          <Button
                            startIcon={<AddCircleIcon />}
                            onClick={() => navigate(`/chef/${user._doc?._id}`)}
                            className="navButton"
                          >
                            My Recipes
                          </Button>
                        )}
                        <Button
                          startIcon={<FavoriteIcon />}
                          onClick={() => navigate(`/favorite/${user._doc?._id}`)}
                          className="navButton"
                        >
                          My Favorites
                        </Button>
                      </>
                    )}
                  </Box>
                </Box>

                {/* Spacer to push user menu to the right */}
                <Box sx={{ flexGrow: 1 }} />

                {/* User menu or Sign-in buttons - only on desktop */}
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
                          src={user._doc?.profileImage || undefined}
                        >
                          {!user._doc?.profileImage &&
                            user._doc?.userName?.charAt(0).toUpperCase()}
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
                  // Sign up/Sign in buttons - only visible on desktop
                  <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
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
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 280,
            boxShadow: '4px 0 8px rgba(0,0,0,0.1)',
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Modal dialogs */}
      <SignUp open={openSignUp} onClose={() => setOpenSignUp(false)} />
      <SignIn open={openSignIn} onClose={() => setOpenSignIn(false)} />
      <AlertDialog
        open={openAlertDialog}
        onClose={() => setOpenAlertDialog(false)}
        onConfirm={confirmLogout}
      />
      
      {/* Add toolbar spacer to prevent content from being hidden under the AppBar */}
      <Toolbar />
    </>
  );
}

export default ModernHeader;