import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogTitle, 
  Button, 
  Box, 
  Typography,
  useTheme,
  useMediaQuery
} from '@mui/material';
import SignUp from '../../components/sign-up/SignUp';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RestaurantIcon from '@mui/icons-material/Restaurant';

const AddToFavoritesDialog = ({ open, onClose }) => {
  const [showSignUp, setShowSignUp] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSignUpClick = () => {
    setShowSignUp(true);
  };

  const handleDialogClick = (e) => {
    e.stopPropagation();
  };

  const handleSignUpClose = () => {
    setShowSignUp(false);
    onClose();
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        onClick={handleDialogClick}
        // הסרנו את ה-fullScreen
        PaperProps={{
          sx: {
            borderRadius: 3,
            width: isMobile ? '90%' : '400px', // במקום minWidth השתמשנו ב-width
            maxWidth: '500px',
            margin: isMobile ? '16px' : 'auto', // הוספנו margin למסכים קטנים
          }
        }}
      >
        <Box sx={{ 
          padding: isMobile ? 2 : 3, // פדינג קטן יותר למסכים קטנים
        }}>
          {/* Icons and Title */}
          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: 'column',
              alignItems: 'center',
              mb: isMobile ? 2 : 3
            }}
          >
            {/* Combined Icons Container */}
            <Box 
              sx={{ 
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                mb: 2
              }}
            >
              <RestaurantIcon 
                sx={{ 
                  fontSize: isMobile ? 40 : 50,
                  color: '#939185',
                  position: 'relative',
                  zIndex: 1
                }}
              />
              <FavoriteIcon 
                sx={{ 
                  fontSize: isMobile ? 24 : 28,
                  color: '#ff4444',
                  position: 'absolute',
                  right: -8,
                  bottom: -8,
                  backgroundColor: 'white',
                  borderRadius: '50%',
                  padding: '2px'
                }}
              />
            </Box>
            <DialogTitle sx={{ 
              p: 0,
              textAlign: 'center',
              fontSize: isMobile ? '1.3rem' : '1.5rem',
              fontWeight: 600,
              color: '#2F3645'
            }}>
              Add to Favorites
            </DialogTitle>
          </Box>

          {/* Content */}
          <DialogContent sx={{ p: 0, mb: isMobile ? 3 : 4 }}>
            <Typography 
              align="center" 
              color="text.secondary"
              sx={{ fontSize: isMobile ? '0.9rem' : '1rem' }}
            >
              To add recipes to your favorites list, you'll need to create an account. 
              Would you like to sign up now?
            </Typography>
          </DialogContent>

          {/* Buttons */}
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'center',
              gap: isMobile ? 1 : 2
            }}
          >
            <Button
              onClick={onClose}
              variant="outlined"
              sx={{
                px: isMobile ? 2 : 3,
                py: 1,
                color: '#2F3645',
                borderColor: '#2F3645',
                '&:hover': {
                  backgroundColor: '#F1E4E4',
                  borderColor: '#2F3645',
                },
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSignUpClick}
              variant="contained"
              sx={{
                px: isMobile ? 2 : 3,
                py: 1,
                backgroundColor: '#2F3645',
                color: '#FFFFFF',
                '&:hover': {
                  backgroundColor: '#4A5367',
                },
              }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Dialog>

      <SignUp open={showSignUp} onClose={handleSignUpClose} />
    </>
  );
};

export default AddToFavoritesDialog;