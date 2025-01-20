import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  useTheme,
  alpha,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Restaurant as RestaurantIcon,
  Favorite as FavoriteIcon,
  AddCircle as AddCircleIcon,
  Person as PersonIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import SignUp from '../../components/sign-up/SignUp';
import SignIn from '../../components/sign-in/SignIn';
import { useUser } from '../../providers/UserProvider';

const mainColor = '#939185';

function ModernHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [openSignUp, setOpenSignUp] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);


  const navigate = useNavigate();
  const { user,logout } = useUser();

  const pages = [
    { text: 'About Us', path: '/' },
    { text: 'Our Chefs', path: '/' },
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
    logout();  
    handleCloseUserMenu();
    navigate('/');
  }

  const drawer = (
    <Box sx={{ width: 280 }} role="presentation">
      <List>
        <ListItem
          sx={{
            justifyContent: 'center',
            py: 3,
            backgroundColor: mainColor,
            color: 'white',
          }}
        >
          <RestaurantIcon sx={{ mr: 1 }} />
          <Typography variant="h6" noWrap component="div"  onClick={() => navigate('/')}>
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
                backgroundColor: alpha(mainColor, 0.1),
              },
            }}
          >
            <ListItemText
              primary={page.text}
              sx={{
                color: mainColor,
                '& .MuiTypography-root': {
                  fontWeight: 500,
                },
              }}
            />
          </ListItem>
        ))}
        {user ? (
          <>
            <Divider sx={{ my: 2 }} />
            {user?.type === 'chef' && (
              <ListItem
                button
                onClick={() => {
                  navigate('/add-recipe');
                  handleDrawerToggle();
                }}
              >
                <ListItemIcon sx={{ color: mainColor }}>
                  <AddCircleIcon />
                </ListItemIcon>
                <ListItemText primary="Add Recipe" />
              </ListItem>
            )}
            <ListItem
              button
              onClick={() => {
                navigate(`/favorite/${user._id}`);
                handleDrawerToggle();
              }}
            >
              <ListItemIcon sx={{ color: mainColor }}>
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
                  backgroundColor: alpha(mainColor, 0.1),
                },
              }}
            >
              <ListItemIcon sx={{ color: mainColor }}>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </>
        ) : (
          <>
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
                  backgroundColor: alpha(mainColor, 0.1),
                },
              }}
            >
              <ListItemText primary="Sign Up" sx={{ color: mainColor }} />
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
                  backgroundColor: alpha(mainColor, 0.1),
                },
              }}
            >
              <ListItemText primary="Sign In" sx={{ color: mainColor }} />
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );
  
  return (
    <>
      <AppBar 
        position="fixed" 
        sx={{ 
          backgroundColor: 'white',
          boxShadow: '0 2px 4px rgba(0,0,0,0.08)'
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ height: 70 }}>
            <IconButton
              onClick={handleDrawerToggle}
              sx={{ 
                color: mainColor,
                display: { xs: 'flex', md: 'none' },
                mr: 1
              }}
            >
              <MenuIcon />
            </IconButton>

            <RestaurantIcon 
              sx={{ 
                display: 'flex',
                mr: 1,
                color: mainColor,
                marginRight: "20px"
              }} 
            />
            <Typography
              variant="h6"
              noWrap
              component="a"
              onClick={() => navigate('/')}
              sx={{
                mr: 4,
                display: 'flex',
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.2rem',
                color: mainColor,
                textDecoration: 'none',
                flexGrow: { xs: 1, md: 0 },
                fontSize: { xs: '1.1rem', md: '1.3rem' },
                cursor: 'pointer'
              }}
            >
              GOOD FOOD 
            </Typography>

            <Box sx={{ 
              flexGrow: 1, 
              display: { xs: 'none', md: 'flex' }, 
              gap: 2
            }}>
              {pages.map((page) => (
                <Button
                  key={page.text}
                  onClick={() => navigate(page.path)}

                  sx={{
                    color: mainColor,
                    px: 2,
                    '&:hover': {
                      backgroundColor: alpha(mainColor, 0.1),
                    },
                    fontSize: '1rem',
                    textTransform: 'none',

                    fontWeight: 500,

                  }}
                >
                  {page.text}
                </Button>
              ))}

              {user && (
                <>
                  {user?.type === 'chef' && (
                    <Button
                      startIcon={<AddCircleIcon />}
                      onClick={() => navigate('/add-recipe')}
                      sx={{
                        color: mainColor,
                        px: 2,
                        '&:hover': {
                          backgroundColor: alpha(mainColor, 0.1),
                        },
                        fontSize: '1rem',
                        textTransform: 'none',
                        fontWeight: 500,

                      }}
                    >
                      Add Recipe
                    </Button>
                  )}
                  <Button
                    startIcon={<FavoriteIcon />}
                    onClick={() => navigate(`/favorite/${user._id}`)}
                    sx={{

                      color: mainColor,
                      px: 2,
                      '&:hover': {
                        backgroundColor: alpha(mainColor, 0.1),
                      },
                      fontSize: '1rem',
                      textTransform: 'none',
                      fontWeight: 500,
                    }}
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
                        bgcolor: mainColor,
                        width: 40,
                        height: 40,

                      }}
                    >
                      {user.userName.charAt(0).toUpperCase()}
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
                      py: 1.5,
                      '&:hover': {
                        backgroundColor: alpha(mainColor, 0.1),
                      },

                    }}
                  >
                    <ListItemIcon sx={{ color: mainColor }}>
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
                  sx={{

                    px: 3,
                    py: 1,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontSize: '1rem',
                    backgroundColor: mainColor,
                    '&:hover': {
                      backgroundColor: alpha(mainColor, 0.9),
                    },

                  }}
                >
                  Sign Up
                </Button>

                <Button 
                  variant="outlined"
                  onClick={() => setOpenSignIn(true)}
                  sx={{ 
                    px: 3,
                    py: 1,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontSize: '1rem',
                    borderColor: mainColor,
                    color: mainColor,
                    '&:hover': {
                      borderColor: mainColor,
                      backgroundColor: alpha(mainColor, 0.1),
                    }
                  }}
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
            boxShadow: '4px 0 8px rgba(0,0,0,0.1)'
          },
        }}
      >
        {drawer}
      </Drawer>
      <SignUp open={openSignUp} onClose={() => setOpenSignUp(false)} />
      <SignIn open={openSignIn} onClose={() => setOpenSignIn(false)} />
    </>
  );
}

export default ModernHeader;
