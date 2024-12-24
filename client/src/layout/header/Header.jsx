import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import RestaurantIcon from '@mui/icons-material/Restaurant';


const pages = ['About Us', 'Our Chefs'];
const settings = ['Profile', 'Logout'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

 

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor:"#E6B9A6"}} >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <RestaurantIcon sx={{ display: { xs: 'none', md: 'flex' ,color: '#2F3645'}, mr: 4 }} />
          <Typography variant="h6" noWrap component="a" sx={{mr: 2, display: { xs: 'none', md: 'flex' },
            fontFamily: 'monospace',fontWeight: 700,letterSpacing: '.3rem',color: "#2F3645",textDecoration: 'none',}}
            >RECIPES FOR YOU! 
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button key={page} onClick={handleCloseNavMenu} sx={{ my: 2, color: '#2F3645', display: 'block' }}>
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="The name of Chef"  />
              </IconButton>
            </Tooltip>
            <Menu
                sx={{ mt: '45px' }} id="menu-appbar"  anchorEl={anchorElUser} anchorOrigin={{ vertical: 'top',  horizontal: 'right',}}
                keepMounted transformOrigin={{vertical: 'top',horizontal: 'right',}}open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}>
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                  </MenuItem>
                ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;



