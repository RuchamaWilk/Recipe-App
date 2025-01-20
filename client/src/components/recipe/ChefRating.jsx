import React, { useEffect, useState } from 'react';
import { Box, Typography, Rating, Paper, Avatar, useTheme, useMediaQuery } from '@mui/material';
import PropTypes from 'prop-types';
import { addRating } from '../../services/apiService';
import { useUser } from '../../providers/UserProvider';
import SignInDialog from '../sign-up/SignUp';
import TimedAleart from '../timed-aleart/TimedAleart';
import ReportProblemIcon from '@mui/icons-material/ReportProblem'; // הוספת האייקון

const ChefRating = ({ recipe }) => {
  const { user, token } = useUser();
  const [openDialog, setOpenDialog] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
const value= recipe.ratings? recipe.ratings.rating/recipe.ratings.reviewers.length: 0;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleRating = async (event, newValue) => {
    if (newValue !== null && user) {
      try {
        const hasRated = recipe?.ratings?.reviewers?.includes(user._id) || false;
        if (hasRated) {
          setOpenAlert(true); // הצגת הודעה אם כבר דירג
          setTimeout(() => {
            setOpenAlert(false);
          }, 2500);
          return;
        }
        await addRating(user._id, recipe._id, newValue,token);

      } catch (error) {
        console.error('Failed to update rating:', error);
  
        // הצגת הודעה במקרה של שגיאה כללית
        setOpenAlert(true);
        setTimeout(() => {
          setOpenAlert(false);
        }, 2500);
      }
    } else if (!user) {
      setOpenDialog(true); // במקרה שמשתמש לא מחובר
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
        <Avatar sx={{ bgcolor: '#E6B9A6' }}>{recipe.chefName[0].toUpperCase()}</Avatar>
        <Typography sx={{ fontWeight: 500 }}>{recipe.chefName}</Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', mt: isMobile ? 2 : 0 }}>
        <Rating
          name="recipe-rating"
          value={value}
          onChange={handleRating}
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
      <TimedAleart
        open={openAlert}
        onClose={() => setOpenAlert(false)}
        title="Sorry!"
        message="You have already rated this recipe!!"
        icon={<ReportProblemIcon color="warning" fontSize="large" />}
      />
    </Paper>
  );
};

ChefRating.propTypes = {
  chefName: PropTypes.string.isRequired,
  recipeID: PropTypes.string.isRequired,
};

export default ChefRating;
