import React, { useState } from 'react';
import { Box, Typography, Rating } from '@mui/material';
import PropTypes from 'prop-types';

const ChefRating = ({ chefId }) => {
  const [value, setValue] = useState(0);

  const handleRatingChange = (event, newValue) => {
    setValue(newValue);
    console.log("New rating value:", newValue);
    // send the value rate to DB of recipe
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', paddingLeft: '25px' }}>
      <Typography>from: {chefId}</Typography>
      <Rating name="no-value" onChange={handleRatingChange} value={value} size="large" />
    </Box>
  );
};

ChefRating.propTypes = {
  chefId: PropTypes.string.isRequired,
};

export default ChefRating;
