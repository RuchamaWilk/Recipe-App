import React from 'react';
import Card from '../card/Card';
import { useNavigate } from 'react-router-dom';
import { Typography, Box, Button, CardActions } from '@mui/material';
import PropTypes from 'prop-types'


const RowCategory = ({ category, recipes }) => {
  const navigate = useNavigate();
  const displayedCards = recipes.slice(0, 4);

  const showRecipes = () => {
    navigate(`/category/${category}`);
  };

  return (
    <Box sx={{ color: '#2F3645' }}>
      <CardActions disableSpacing sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {category}
        </Typography>
        <Button
          sx={{
            color: '#2F3645',
            fontSize: '14px', // אפשר לשנות את הגודל אם תרצה
          }}
          onClick={showRecipes}
          size="small"
        >
          More
        </Button>
      </CardActions>

      <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: '8px', flexWrap: 'wrap' }}>
        {displayedCards.map((item, index) => (
          <Box key={index} sx={{  marginBottom: '20px' }}>
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
      image: PropTypes.string.isRequired,    
      name: PropTypes.string.isRequired,      
      avgTime: PropTypes.number.isRequired, 
    })
  ).isRequired, 

};

export default RowCategory;
