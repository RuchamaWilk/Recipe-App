import React, { useState } from 'react';
import { Box, Typography, Rating,Paper,Avatar } from '@mui/material';
import PropTypes from 'prop-types';

// Chef Rating Component
const ChefRating = ({ chefId }) => {
  const [value, setValue] = useState(0);

  return (
    <Paper elevation={0} sx={{ 
      p: 2, 
      mt: 2, 
      backgroundColor: '#f8f8f8',
      borderRadius: 2,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar sx={{ bgcolor: '#E6B9A6' }}>{chefId[0].toUpperCase()}</Avatar>
        <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
          {chefId}
        </Typography>
      </Box>
      <Rating 
        name="recipe-rating" 
        value={value} 
        onChange={(_, newValue) => setValue(newValue)}
        size="large"
        sx={{ 
          '& .MuiRating-iconFilled': {
            color: 'yelow',
          }
        }}
      />
    </Paper>
  );
};

ChefRating.propTypes = {
  chefId: PropTypes.string.isRequired,
};

export default ChefRating;
