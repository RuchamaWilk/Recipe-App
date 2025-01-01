
import React from 'react';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import PropTypes from 'prop-types';

const RecipeInstructions = ({ ingredients, instructions }) => {
  return (
    <>
      <Typography variant="h5" sx={{ marginTop: 2 }}>Ingredients</Typography>
      <List>
        {ingredients.map((item, index) => (
          <ListItem key={index}>
            <ListItemText primary={`• ${item.amount} ${item.name}`} />
          </ListItem>
        ))}
      </List>
      <Typography variant="h5" sx={{ marginTop: 2 }}>Instructions</Typography>
      <List>
        {instructions.map((item, index) => (
          <ListItem key={index}>
            <ListItemText primary={`${index + 1}. ${item.name}`} />
          </ListItem>
        ))}
      </List>
    </>
  );
};

RecipeInstructions.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.shape({
    amount: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  instructions: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
  })).isRequired,
};

export default RecipeInstructions;
