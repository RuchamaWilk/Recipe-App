import React from 'react';
import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const RecipeAIBox = ({ aiSuggestion }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
      <Box 
        sx={{ width: "50vw", height: "20vh", backgroundColor: '#EEEDEB', borderRadius: '4px', marginTop: 2, padding: 2 }}>
        <Typography variant="h6">AI Suggestion</Typography>
        <Typography variant="body1">{aiSuggestion}</Typography>
      </Box>
    </Box>
  );
};

RecipeAIBox.propTypes = {
  aiSuggestion: PropTypes.string.isRequired,
};

export default RecipeAIBox;
