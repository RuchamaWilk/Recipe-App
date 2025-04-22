import React, { useState } from "react";
import { Paper, Typography, Box, Avatar, Rating, Chip } from "@mui/material";
import { Person, ReportProblem } from "@mui/icons-material";
import PropTypes from "prop-types";
import { addRating } from '../../services/apiService';
import { useUser } from '../../providers/UserProvider';
import SignInDialog from '../sign-up/SignUp';
import TimedAleart from '../timed-aleart/TimedAleart';

const ChefRating = ({ recipe }) => {
  const { user, token } = useUser();
  const [openDialog, setOpenDialog] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const value = recipe.ratings ? recipe.ratings.rating / recipe.ratings.reviewers.length : 0;

  const handleRating = async (event, newValue) => {
    if (newValue !== null && user) {
      try {
        const hasRated = recipe?.ratings?.reviewers?.includes(user._id) || false;
        if (hasRated) {
          setOpenAlert(true);
          setTimeout(() => {
            setOpenAlert(false);
          }, 2500);
          return;
        }
        await addRating(user._doc._id, recipe._id, newValue, token);

      } catch (error) {
        console.error('Failed to update rating:', error);
        setOpenAlert(true);
        setTimeout(() => {
          setOpenAlert(false);
        }, 2500);
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
      elevation={3} 
      sx={{ 
        mt: 4, 
        p: 3, 
        borderRadius: 2, 
        bgcolor: "#FFFAF6", 
        border: "1px solid #E6B9A6",
        position: "relative"
      }}
    >
      <Typography 
        variant="h6" 
        sx={{ 
          mb: 3, 
          display: "flex", 
          alignItems: "center", 
          gap: 1, 
          color: "#B25E45", 
          fontWeight: 600,
          borderBottom: "2px solid #E6B9A6",
          pb: 1
        }}
      >
        <Person sx={{ color: "#E6B9A6" }} />
        Chef Rating
      </Typography>

      <Box 
        sx={{ 
          display: "flex", 
          flexDirection: { xs: "column", sm: "row" }, 
          alignItems: { xs: "flex-start", sm: "center" },
          justifyContent: "space-between",
          gap: 2,
          bgcolor: "#FFF", 
          p: 2, 
          borderRadius: 2,
          boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
          borderTop: "3px solid #E6B9A6"
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar 
            sx={{ 
              bgcolor: "#E6B9A6",
              color: "#FFF" 
            }}
          >
            {recipe.chefId.userName[0].toUpperCase()}
          </Avatar>
          <Typography 
            variant="body1" 
            sx={{ 
              fontWeight: 500,
              color: "#555"
            }}
          >
            {recipe.chefId.userName}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Rating
            name="recipe-rating"
            value={value}
            onChange={handleRating}
            sx={{
              '& .MuiRating-iconFilled': {
                color: '#E6B9A6',
              },
              '& .MuiRating-iconHover': {
                color: '#D9A796',
              }
            }}
          />
          
          {recipe.ratings && recipe.ratings.reviewers.length > 0 && (
            <Chip 
              label={`${recipe.ratings.reviewers.length} ${recipe.ratings.reviewers.length === 1 ? 'review' : 'reviews'}`} 
              size="small" 
              sx={{ 
                ml: 1,
                bgcolor: "#E6B9A6", 
                color: "#FFF",
                fontSize: "0.7rem",
                transition: "background-color 0.3s"
              }} 
            />
          )}
        </Box>
      </Box>

      <SignInDialog
        open={openDialog}
        onClose={handleCloseDialog}
      />
      
      <TimedAleart
        open={openAlert}
        onClose={() => setOpenAlert(false)}
        title="Sorry!"
        message="You have already rated this recipe!"
        icon={<ReportProblem color="warning" fontSize="large" />}
      />
    </Paper>
  );
};

ChefRating.propTypes = {
  recipe: PropTypes.object.isRequired,
};

export default ChefRating;