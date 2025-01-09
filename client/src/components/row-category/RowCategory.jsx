import React, { useState, useEffect } from 'react';
import Card from '../card/Card';
import { useNavigate } from 'react-router-dom';
import { Typography, Box, Button, CardActions } from '@mui/material';
import PropTypes from 'prop-types';

const RowCategory = ({ category, recipes }) => {
  const navigate = useNavigate();
  const [cardsToShow, setCardsToShow] = useState(4);
  const CARD_MIN_WIDTH = 320; // Match Card component's sm breakpoint width
  const GAP = 16;

  const showRecipes = () => {
    navigate(`/category/${category}`);
  };

  useEffect(() => {
    const updateCardsCount = () => {
      const containerWidth = document.getElementById(category)?.offsetWidth || 0;
      // Calculate how many cards can fit considering the gap
      const possibleCards = Math.floor((containerWidth + GAP) / (CARD_MIN_WIDTH + GAP));
      // Always show at least 1 card, but no more than what can fit at minimum width
      setCardsToShow(Math.max(1, possibleCards));
    };

    updateCardsCount();
    window.addEventListener('resize', updateCardsCount);
    return () => window.removeEventListener('resize', updateCardsCount);
  }, [category]);

  const hasMoreRecipes = recipes.length > cardsToShow;

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
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          px: 2,
          mb: 2
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          {category}
        </Typography>
        {hasMoreRecipes && (
          <Button
            sx={{
              color: '#2F3645',
              fontSize: '14px',
            }}
            onClick={showRecipes}
            size="small"
          >
            More
          </Button>
        )}
      </CardActions>

      <Box 
        id={category}
        sx={{ 
          display: 'flex',
          flexWrap: 'nowrap',
          gap: `${GAP}px`,
          px: 2,
          overflowX: 'hidden',
          '& > *': {
            flex: `0 0 ${CARD_MIN_WIDTH}px`,
            minWidth: `${CARD_MIN_WIDTH}px`,
            maxWidth: `${CARD_MIN_WIDTH}px`
          }
        }}
      >
        {recipes.slice(0, cardsToShow).map((item, index) => (
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