import React from 'react';
import { Box, Typography, TextField, Button, Divider, IconButton, useTheme, useMediaQuery } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ImageIcon from '@mui/icons-material/Image';
import RecipeImageField from './RecipeImageField';
import IngredientFields from './IngredientFields';
import InstructionFields from './InstructionFields';

const RecipeFormFields = ({ 
  formData, 
  imageError, 
  handleChange, 
  handleIngredientChange, 
  handleInstructionChange,
  handleAddIngredient, 
  handleRemoveIngredient, 
  handleAddInstruction, 
  handleRemoveInstruction 
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  return (
    <>
      <Box sx={{ 
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
        gap: { xs: 2, sm: 3 },
        mb: { xs: 3, sm: 4 }
      }}>
        <TextField
          fullWidth
          label="Add a New Recipe"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          variant="outlined"
          size={isMobile ? "small" : "medium"}
        />
        <TextField
          fullWidth
          label="Preparation Time"
          name="avgTime"
          value={formData.avgTime}
          onChange={handleChange}
          required
          variant="outlined"
          size={isMobile ? "small" : "medium"}
        />
        
        <RecipeImageField 
          image={formData.image}
          imageError={imageError}
          handleChange={handleChange}
          isMobile={isMobile}
        />
        
        <TextField
          fullWidth
          label="Category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          variant="outlined"
          size={isMobile ? "small" : "medium"}
        />
      </Box>

      <Divider sx={{ my: { xs: 2, sm: 4 } }} />
      
      <IngredientFields 
        ingredients={formData.ingredients}
        handleIngredientChange={handleIngredientChange}
        handleAddIngredient={handleAddIngredient}
        handleRemoveIngredient={handleRemoveIngredient}
        isMobile={isMobile}
      />

      <InstructionFields 
        instructions={formData.instructions}
        handleInstructionChange={handleInstructionChange}
        handleAddInstruction={handleAddInstruction}
        handleRemoveInstruction={handleRemoveInstruction}
        isMobile={isMobile}
      />

      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        mt: { xs: 2, sm: 4 }
      }}>
        <Button
          type="submit"
          variant="contained"
          size={isMobile ? "medium" : "large"}
          endIcon={<SendIcon />}
          sx={{
            px: { xs: 3, sm: 4 },
            py: { xs: 1, sm: 1.5 },
            backgroundColor: '#939185',
            '&:hover': {
              backgroundColor: '#7a796f'
            }
          }}
        >
          Save Recipe
        </Button>
      </Box>
    </>
  );
};

export default RecipeFormFields;