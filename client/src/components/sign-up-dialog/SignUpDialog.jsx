import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  Box,
  useTheme,
  useMediaQuery,
  Typography
} from '@mui/material';
import SignUp from '../sign-up/SignUp';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import './SignUpDialog.css';

const SignInDialog = ({ open, onClose }) => {
  const [showSignUp, setShowSignUp] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSignUpClick = () => setShowSignUp(true);

  const handleDialogClick = (e) => e.stopPropagation();

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
        PaperProps={{
          className: `dialog-paper ${isMobile ? '' : 'desktop'}`,
        }}
      >
        <Box className={`dialog-box ${isMobile ? 'mobile' : ''}`}>
          {/* Header */}
          <Box className={`dialog-header ${isMobile ? 'mobile' : ''}`}>
            <Box className="icons-container">
              <RestaurantIcon className={`restaurant-icon ${isMobile ? 'mobile' : ''}`} />
              <FavoriteIcon className={`favorite ${isMobile ? 'mobile' : ''}`} />
            </Box>
            <DialogTitle className={`dialog-title ${isMobile ? 'mobile' : ''}`}>
              Add to Favorites
            </DialogTitle>
          </Box>

          {/* Content */}
          <DialogContent className={`dialog-content ${isMobile ? 'mobile' : ''}`}>
            <Typography align="center" color="text.secondary">
              To add recipes to your favorites list, you'll need to create an account. Would you like to sign up now?
            </Typography>
          </DialogContent>

          {/* Buttons */}
          <Box className={`dialog-buttons ${isMobile ? 'mobile' : ''}`}>
            <Button onClick={onClose} variant="outlined" className="cancel-button">
              Cancel
            </Button>
            <Button onClick={handleSignUpClick} variant="contained" className="sign-up-button">
              Sign Up
            </Button>
          </Box>
        </Box>
      </Dialog>

      <SignUp open={showSignUp} onClose={handleSignUpClose} />
    </>
  );
};

export default SignInDialog;
