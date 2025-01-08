import React from 'react';
import { Box, Typography, CardMedia, Container } from '@mui/material';
import PropTypes from 'prop-types';


// Recipe Header Component
const RecipeHeader = ({ image, name }) => {
  return (
    <Box sx={{ 
      position: 'relative',
      borderRadius: '16px 16px 0 0',
      overflow: 'hidden',
      height: { xs: '250px', sm: '350px', md: '450px' }
    }}>
      <Box
        component="img"
        src={image}
        alt={name}
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transition: 'transform 0.3s ease-in-out',
          '&:hover': {
            transform: 'scale(1.03)',
          },
          filter: 'brightness(0.65)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          width: '90%',
        }}
      >
        <Typography
          variant="h1"
          sx={{
            color: '#ffffff',
            fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
            fontWeight: 800,
            textShadow: '3px 3px 6px rgba(0,0,0,0.5)',
            letterSpacing: '0.02em',
          }}
        >
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