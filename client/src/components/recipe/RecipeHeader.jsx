import React from 'react';
import { Box, Typography, CardMedia } from '@mui/material';
import PropTypes from 'prop-types';

const RecipeHeader = ({ image, name }) => {
  return (
    <Box sx={{ position: 'relative' }}>
      <CardMedia component="img" height="250" image={image} alt={name} sx={{ filter: "brightness(50%)" }} />
      <Box sx={{ color: "#EEEDEB", position: 'absolute', top: '7%', left: '5%', textShadow: '-3px 1px 8px #939185' }}>
        <Typography variant="h3">
          {name}
        </Typography>
      </Box>
    </Box>
  );
};

RecipeHeader.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default RecipeHeader;
