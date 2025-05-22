import React from 'react';
import { Box, Typography, TextField, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const IngredientFields = ({ 
  ingredients, 
  handleIngredientChange, 
  handleAddIngredient, 
  handleRemoveIngredient,
  isMobile 
}) => {
  return (
    <Box sx={{ mb: { xs: 2, sm: 4 } }}>
      <Typography variant="h5" sx={{ 
        mb: 2, 
        fontWeight: 'bold', 
        color: 'text.primary',
        fontSize: { xs: '1.25rem', sm: '1.5rem' }
      }}>
        Ingredients
      </Typography>
      {ingredients.map((ingredient, index) => (
        <Box key={index} sx={{ 
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'stretch', sm: 'center' },
          gap: { xs: 1, sm: 2 },
          mb: 2
        }}>
          <TextField
            sx={{ flex: 1 }}
            label="Ingredient Name"
            name="name"
            value={ingredient.name}
            onChange={(e) => handleIngredientChange(index, e)}
            required
            variant="outlined"
            size={isMobile ? "small" : "medium"}
          />
          <TextField
            sx={{ flex: 1 }}
            label="Amount"
            name="amount"
            value={ingredient.amount}
            onChange={(e) => handleIngredientChange(index, e)}
            required
            variant="outlined"
            size={isMobile ? "small" : "medium"}
          />
          <Box sx={{ 
            display: 'flex', 
            gap: 1,
            mt: { xs: 1, sm: 0 }
          }}>
            <IconButton
              onClick={() => handleRemoveIngredient(index)}
              color="error"
              disabled={ingredients.length === 1}
              size={isMobile ? "small" : "medium"}
            >
              <DeleteIcon fontSize={isMobile ? "small" : "medium"} />
            </IconButton>
            {index === ingredients.length - 1 && (
              <IconButton
                onClick={handleAddIngredient}
                color="primary"
                size={isMobile ? "small" : "medium"}
              >
                <AddIcon fontSize={isMobile ? "small" : "medium"} />
              </IconButton>
            )}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default IngredientFields;
