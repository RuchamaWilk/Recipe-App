// CardFooter.jsx
import React from 'react';
import { Box, CardContent, Typography } from '@mui/material';
import RatingDisplay from './RatingDisplay';

const CardFooter = ({ recipe }) => {
  return (
    <CardContent className="card-content">
      <Typography variant="h5" className="recipe-title">
        {recipe.name}
      </Typography>

      <Box className="recipe-details">
        <Box className="chef-time-container">
          <Typography variant="body2" className="chef-name">
            {recipe.chefId.userName}
          </Typography>
          <Typography variant="body2" className="cook-time">
            {`${recipe.avgTime} Min`}
          </Typography>
        </Box>

        <RatingDisplay ratings={recipe.ratings} />
      </Box>
    </CardContent>
  );
};

export default CardFooter;