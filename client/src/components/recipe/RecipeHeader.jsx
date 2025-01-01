import React from 'react';
import { Box, Typography, CardMedia } from '@mui/material';
import PropTypes from 'prop-types';

const RecipeHeader = ({ image, name }) => {
  return (
    <Box sx={{ position: 'relative' }}>
      <CardMedia component="img"   image={image} alt={name} sx={{ filter: "brightness(50%)" , width: '100%', // make the image responsive by making it take 100% width
          height: 'auto', objectFit: 'cover', maxHeight: '300px'}} />
      <Box sx={{ color: "#EEEDEB", position: 'absolute', top: '70%', left: '5%', textShadow: '-3px 1px 8px #939185' }}>
        <Typography sx={{ fontSize: { xs: '1.5rem', sm: '2.5rem', md: '3rem' } }} >
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
