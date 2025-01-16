import React, { useEffect, useState } from 'react';
import { Box, Typography, Rating, Paper, Avatar } from '@mui/material';
import PropTypes from 'prop-types';
import { addRating, checkIfRated } from '../../services/apiService'; // Add API call to fetch rating
import { useUser } from '../../providers/UserProvider';
import SignInDialog from '../sign-up/SignUp';

const ChefRating = ({ chefName, recipeID }) => {
  const [value, setValue] = useState(0);
  const [isRated, setIsRated] = useState(false); // Check if user has rated
  const { user } = useUser();
  const [openDialog, setOpenDialog] = useState(false);
  

  // Fetch rating data when the component loads
  useEffect(() => {
    const fetchRating = async () => {
      if (user) {
        try {
          const  hasRated  = await checkIfRated(user._id, recipeID);
          console.log("hasRated ", hasRated)
          setIsRated(hasRated); // Lock the rating if already rated
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
        setValue(newValue); // Update UI immediately
        await addRating(user._id, recipeID, newValue); // Add rating to the server
        setIsRated(true); // Lock the rating after successful update
      } catch (error) {
        console.error('Failed to update rating:', error);
      }
    } else if (!user) {
      setOpenDialog(true);
    }
  };

  const handleDialogClick = (e) => {
    e.stopPropagation();
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
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar sx={{ bgcolor: '#E6B9A6' }}>{chefName[0].toUpperCase()}</Avatar>
        <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
          {chefName}
        </Typography>
      </Box>
      <Rating
        name="recipe-rating"
        value={value}
        onChange={handleRating}
        size="large"
        disabled={isRated} // Lock the rating if already rated
        sx={{
          '& .MuiRating-iconFilled': {
            color: 'yellow',
          },
        }}
      />
      <SignInDialog
        open={openDialog}
        onClose={(e) => {
          handleDialogClick(e);
          setOpenDialog(false);
        }}
        onClick={handleDialogClick}
      />
    </Paper>
  );
};

ChefRating.propTypes = {
  chefName: PropTypes.string.isRequired,
  recipeID: PropTypes.string.isRequired,
};

export default ChefRating;
