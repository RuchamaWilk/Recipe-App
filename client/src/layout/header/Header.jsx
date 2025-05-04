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

// New color variables
const colors = {
  offwhite: '#F6E6E4',
  lightPink: '#ffbcb3',
  pink: '#CA8A8B',
  green: '#577657',
  black: '#000000'
};

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
          bgcolor: colors.pink,
          width: 60,
          height: 60,
          mb: 1
        }}
        src={user?._doc?.profileImage || undefined}
      >
        {!user?._doc?.profileImage && user?._doc?.userName?.charAt(0).toUpperCase()}
      </Avatar>
      <Typography variant="body1" sx={{ fontWeight: 500, color: colors.green }}>
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
            backgroundColor: colors.green,
            color: colors.offwhite,
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
                backgroundColor: alpha(colors.lightPink, 0.2),
              },
            }}
          >
            <ListItemText
              primary={page.text}
              sx={{
                color: colors.green,
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
                <ListItemIcon sx={{ color: colors.green }}>
                  <AddCircleIcon />
                </ListItemIcon>
                <ListItemText primary="My Recipes" sx={{ color: colors.green }} />
              </ListItem>
            )}
            <ListItem
              button
              onClick={() => {
                navigate(`/favorite/${user._doc?._id}`);
                handleDrawerToggle();
              }}
            >
              <ListItemIcon sx={{ color: colors.green }}>
                <FavoriteIcon />
              </ListItemIcon>
              <ListItemText primary="My Favorites" sx={{ color: colors.green }} />
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
                  backgroundColor: alpha(colors.lightPink, 0.2),
                },
              }}
            >
              <ListItemIcon sx={{ color: colors.green }}>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" sx={{ color: colors.green }} />
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
                  backgroundColor: alpha(colors.lightPink, 0.2),
                },
              }}
            >
              <ListItemText primary="Sign Up" sx={{ color: colors.green }} />
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
                  backgroundColor: alpha(colors.lightPink, 0.2),
                },
              }}
            >
              <ListItemText primary="Sign In" sx={{ color: colors.green }} />
            </ListItem>
          </React.Fragment>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: colors.offwhite, color: colors.green, boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ display: 'flex', minHeight: '70px', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px' }}>
            {/* Mobile layout: Menu on left, Logo in center */}
            {isMobile && (
              <>
                {/* Left side - Menu button */}
                <IconButton
                  size="large"
                  edge="start"
                  sx={{ color: colors.green, mr: 2 }}
                  aria-label="menu"
                  onClick={handleDrawerToggle}
                >
                  <MenuIcon />
                </IconButton>
                
                {/* Center - Logo */}
                <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <RestaurantIcon sx={{ color: colors.green, marginRight: '8px', fontSize: '28px' }} />
                    <Typography
                      variant="h6"
                      noWrap
                      component="a"
                      onClick={() => navigate('/')}
                      sx={{ 
                        fontWeight: 600,
                        color: colors.green,
                        letterSpacing: '1px',
                        marginRight: '24px',
                        textDecoration: 'none',
                        cursor: 'pointer'
                      }}
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
                  <RestaurantIcon sx={{ color: colors.green, marginRight: '8px', fontSize: '28px' }} />
                  <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    onClick={() => navigate('/')}
                    sx={{ 
                      fontWeight: 600,
                      color: colors.green,
                      letterSpacing: '1px',
                      marginRight: '24px',
                      textDecoration: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    GOOD FOOD
                  </Typography>
                
                  {/* Navigation buttons - only visible on desktop */}
                  <Box sx={{ display: 'flex', flexGrow: 1, gap: '12px', ml: 3 }}>
                    {pages.map((page) => (
                      <Button
                        key={page.text}
                        onClick={() => navigate(page.path)}
                        sx={{ 
                          color: colors.green,
                          textTransform: 'none',
                          fontWeight: 500,
                          padding: '8px 12px',
                          borderRadius: '4px',
                          '&:hover': {
                            backgroundColor: alpha(colors.lightPink, 0.2)
                          }
                        }}
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
                            sx={{ 
                              color: colors.green,
                              textTransform: 'none',
                              fontWeight: 500,
                              padding: '8px 12px',
                              borderRadius: '4px',
                              '&:hover': {
                                backgroundColor: alpha(colors.lightPink, 0.2)
                              }
                            }}
                          >
                            My Recipes
                          </Button>
                        )}
                        <Button
                          startIcon={<FavoriteIcon />}
                          onClick={() => navigate(`/favorite/${user._doc?._id}`)}
                          sx={{ 
                            color: colors.green,
                            textTransform: 'none',
                            fontWeight: 500,
                            padding: '8px 12px',
                            borderRadius: '4px',
                            '&:hover': {
                              backgroundColor: alpha(colors.lightPink, 0.2)
                            }
                          }}
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
                            bgcolor: colors.pink,
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
                        sx={{
                          '&:hover': {
                            backgroundColor: alpha(colors.lightPink, 0.2)
                          }
                        }}
                      >
                        <ListItemIcon sx={{ color: colors.green, minWidth: '36px' }}>
                          <LogoutIcon />
                        </ListItemIcon>
                        <Typography color={colors.green}>Logout</Typography>
                      </MenuItem>
                    </Menu>
                  </Box>
                ) : (
                  // Sign up/Sign in buttons - only visible on desktop
                  <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
                    <Button
                      variant="contained"
                      onClick={() => setOpenSignUp(true)}
                      sx={{
                        backgroundColor: colors.green,
                        color: colors.offwhite,
                        textTransform: 'none',
                        borderRadius: '4px',
                        padding: '6px 16px',
                        fontWeight: 500,
                        '&:hover': {
                          backgroundColor: alpha(colors.green, 0.8)
                        }
                      }}
                    >
                      Sign Up
                    </Button>

                    <Button
                      variant="outlined"
                      onClick={() => setOpenSignIn(true)}
                      sx={{
                        borderColor: colors.green,
                        color: colors.green,
                        textTransform: 'none',
                        borderRadius: '4px',
                        padding: '6px 16px',
                        fontWeight: 500,
                        '&:hover': {
                          backgroundColor: alpha(colors.lightPink, 0.2),
                          borderColor: alpha(colors.green, 0.8)
                        }
                      }}
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
            backgroundColor: colors.offwhite
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