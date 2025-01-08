import React from 'react';
import { Paper, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { Kitchen, Timer, RestaurantMenu } from '@mui/icons-material';

const RecipeAIBox = () => {
  return (
    <Paper 
      elevation={3}
      sx={{ 
        mt: 4,
        p: 3,
        borderRadius: 2,
        bgcolor: '#f8f8f8',
        border: '1px solid #e0e0e0'
      }}
    >
      <Typography 
        variant="h6" 
        sx={{ 
          mb: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          color: '#E6B9A6',
          fontWeight: 600
        }}
      >
        <Timer />
        Tips and Recommendations from Our AI
      </Typography>
      <Typography>
      Here you will find personalized tips and recommendations for this recipe...
      </Typography>
    </Paper>
  );
};

RecipeAIBox.propTypes = {
  aiSuggestion: PropTypes.string.isRequired,
};

export default RecipeAIBox;
