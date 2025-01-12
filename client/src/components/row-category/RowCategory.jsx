import React, { useState, useEffect } from 'react';
import Card from '../card/Card';
import { useNavigate } from 'react-router-dom';
import { Typography, Box, Button, CardActions } from '@mui/material';
import PropTypes from 'prop-types';

const RowCategory = ({ category, recipes }) => {
  const navigate = useNavigate();

  const showRecipes = () => {
    navigate(`/category/${category}`);
  };

  return (
    <Box 
        sx={{ 
          width: '100%',
          mb: 4, // Add margin bottom between categories
        }}
      >
        <CardActions 
          disableSpacing 
          sx={{ 
            justifyContent: 'space-between', 
            px: 2,
          }}>
          <Typography variant="h4" component="h1" gutterBottom>
            {category}
          </Typography>
         
            <Button
              sx={{
                color: '#2F3645',
                marginTop: "auto",
                fontSize: '14px',
              }}
              onClick={showRecipes}
              size="small"
            >
              More
            </Button>
         
        </CardActions>

      <Box 
        id={category}
        sx={{ 
          display: 'flex',
          flexWrap: 'nowrap',
          gap: `16px`,
          px: 2,
          overflowX: 'hidden',
        }}
      >
        {recipes.slice(0, 4).map((item, index) => (
          <Box key={index}>
            <Card recipe={item} />
          </Box>
        ))}
      </Box>

    </Box>
  );
};

RowCategory.propTypes = {
  category: PropTypes.string.isRequired,
  recipes: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      avgTime: PropTypes.number.isRequired,
      chefId: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default RowCategory;