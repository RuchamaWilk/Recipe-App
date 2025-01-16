import React, { useEffect, useState } from 'react';
import { Box, Typography, Rating, Paper, Avatar, useTheme, useMediaQuery } from '@mui/material';
import PropTypes from 'prop-types';
import { addRating, checkIfRated } from '../../services/apiService';
import { useUser } from '../../providers/UserProvider';
import SignInDialog from '../sign-up/SignUp';

const ChefRating = ({ chefName, recipeID }) => {
  const [value, setValue] = useState(0);
  const [isRated, setIsRated] = useState(false);
  const { user } = useUser();
  const [openDialog, setOpenDialog] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchRating = async () => {
      if (user) {
        try {
          const hasRated = await checkIfRated(user._id, recipeID);
          setIsRated(hasRated);
        } catch (error) {
          console.error('Failed to fetch rating:', error);
        }
      }
    };
    fetchRating();
  }, [user, recipeID]);

  const handleRating = async (event, newValue) => {
    if (newValue !== null && user && !isRated) {
      try {
        setValue(newValue);
        await addRating(user._id, recipeID, newValue);
        setIsRated(true);
      } catch (error) {
        console.error('Failed to update rating:', error);
      }
    } else if (!user) {
      setOpenDialog(true);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        mt: 2,
        backgroundColor: '#f8f8f8',
        borderRadius: 2,
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: isMobile ? 'flex-start' : 'center',
        justifyContent: 'space-between',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          flexDirection: isMobile ? 'column' : 'row',
          mb: 2,
        }}
      >
        <Avatar sx={{ bgcolor: '#E6B9A6' }}>{chefName[0].toUpperCase()}</Avatar>
        <Typography sx={{ fontWeight: 500 }}>{chefName}</Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', mt: isMobile ? 2 : 0 }}>
        <Rating
          name="recipe-rating"
          value={value}
          onClick={handleRating}
          size={isMobile ? 'medium' : 'large'}
          sx={{
            '& .MuiRating-iconFilled': {
              color: 'yellow',
            },
          }}
        />
      </Box>

      <SignInDialog
        open={openDialog}
        onClose={handleCloseDialog} // Close on clicking outside the dialog or pressing Cancel
      />
    </Paper>
  );
};

ChefRating.propTypes = {
  chefName: PropTypes.string.isRequired,
  recipeID: PropTypes.string.isRequired,
};

export default ChefRating;
