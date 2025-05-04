import React from 'react';
import { Box, Typography, Rating } from '@mui/material';

const RatingDisplay = ({ ratings }) => {
  const value = ratings ? ratings.rating / ratings.reviewers.length : 0;
  const countRates = ratings ? ratings.reviewers.length : 0;

  return (
    <Box>
      <Typography variant="body2" className="raters-count" sx={{ textAlign: 'right' }}>
        {countRates} raters
      </Typography>
      <Rating
        name="recipe-rating"
        value={value}
        size="small"
        readOnly
        className="recipe-rating"
      />
    </Box>
  );
};

export default RatingDisplay;