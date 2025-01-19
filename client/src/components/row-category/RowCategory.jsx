// RowCategory.jsx
import React, { useState, useEffect } from 'react';
import Card from '../card/Card';
import { useNavigate } from 'react-router-dom';
import { Typography, Box, Button, CardActions } from '@mui/material';
import PropTypes from 'prop-types';
import './RowCategory.css';

const RowCategory = ({ category, recipes }) => {
  const navigate = useNavigate();
  const [maxVisibleCards, setMaxVisibleCards] = useState(4);

  useEffect(() => {
    const updateMaxVisibleCards = () => {
      if (window.innerWidth < 400) {
        setMaxVisibleCards(1); 
      } else if (window.innerWidth < 641) {
        setMaxVisibleCards(2);
      } else if (window.innerWidth < 2000) {
        setMaxVisibleCards(3);
      } else {
        setMaxVisibleCards(4);
      }
    };

    updateMaxVisibleCards(); 
    window.addEventListener('resize', updateMaxVisibleCards); 
    return () => window.removeEventListener('resize', updateMaxVisibleCards);
  }, []);

  const showRecipes = () => {
    navigate(`/category/${category}`);
  };

  return (
    <Box className="row-category-container">
      <CardActions className="row-category-header" disableSpacing>
        <Typography variant="h4" component="h1" gutterBottom>
          {category}
        </Typography>
        {recipes.length > maxVisibleCards && (
          <Button
            className="row-category-more-button"
            onClick={showRecipes}
            size="small"
          >
            More
          </Button>
        )}
      </CardActions>

      <Box id={category} className="row-category-cards">
        {recipes.slice(0, 4).map((item, index) => (
          <Box key={index} /*className="row-category-card-item"*/>
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
