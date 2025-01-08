
import React from 'react';
import { Box, Typography, List, ListItem, ListItemText ,Paper} from '@mui/material';
import PropTypes from 'prop-types';

import { Kitchen, Timer, RestaurantMenu } from '@mui/icons-material';

const RecipeInstructions = ({ ingredients, instructions }) => {
  return (
    <Box sx={{ mt: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Kitchen sx={{ color: '#E6B9A6', fontSize: 30 }} />
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Ingredients
          </Typography>
        </Box>
        <Paper elevation={1} sx={{ p: 2, borderRadius: 2 }}>
          <List>
            {ingredients.map((item, index) => (
              <ListItem 
                key={index}
                sx={{
                  py: 1,
                  borderBottom: index !== ingredients.length - 1 ? '1px solid #eee' : 'none'
                }}
              >
                <ListItemText 
                  primary={
                    <Typography sx={{ fontWeight: 500 }}>
                      {`●  ${item.amount} ${item.name}`}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>

      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <RestaurantMenu sx={{ color: '#E6B9A6', fontSize: 30 }} />
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Instructions
          </Typography>
        </Box>
        <Paper elevation={1} sx={{ p: 2, borderRadius: 2 }}>
          <List>
            {instructions.map((item, index) => (
              <ListItem 
                key={index}
                sx={{
                  py: 2,
                  borderBottom: index !== instructions.length - 1 ? '1px solid #eee' : 'none'
                }}
              >
                <ListItemText 
                  primary={
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Typography 
                        sx={{ 
                          bgcolor: '#E6B9A6',
                          color: 'white',
                          width: 28,
                          height: 28,
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          fontWeight: 600
                        }}
                      >
                        {index + 1}
                      </Typography>
                      <Typography>{item.name}</Typography>
                    </Box>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
    </Box>
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
