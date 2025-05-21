import React from 'react';
import { Container, Paper, Box } from '@mui/material';
import RecipeFormHeader from './RecipeFormHeader';
import RecipeFormFields from './RecipeFormFields';
import useRecipeForm from '../../hooks/useRecipeForm';
import TimedAlert from '../../components/timed-aleart/TimedAleart';

const RecipeForm = () => {
    const {
      formData,
      isEditMode,
      imageError,
      openSuccess,
      handleChange,
      handleIngredientChange,
      handleInstructionChange,
      handleAddIngredient,
      handleRemoveIngredient,
      handleAddInstruction,
      handleRemoveInstruction,
      handleSubmit,
      setOpenSuccess
    } = useRecipeForm();
  
    return (
      <Container maxWidth="md" sx={{ py: 2 }}>
        <Paper elevation={3} sx={{ p: { xs: 2, sm: 3, md: 4 }, mx: { xs: -2, sm: 0 } }}>
          <RecipeFormHeader isEditMode={isEditMode} />
          
          <form onSubmit={handleSubmit}>
            <RecipeFormFields 
              formData={formData}
              imageError={imageError}
              handleChange={handleChange}
              handleIngredientChange={handleIngredientChange}
              handleInstructionChange={handleInstructionChange}
              handleAddIngredient={handleAddIngredient}
              handleRemoveIngredient={handleRemoveIngredient}
              handleAddInstruction={handleAddInstruction}
              handleRemoveInstruction={handleRemoveInstruction}
            />
          </form>
        </Paper>
        
        <TimedAlert
          open={openSuccess}
          onClose={() => setOpenSuccess(false)}
          title={isEditMode ? 'Recipe Updated Successfully!' : 'Recipe Added Successfully!'}
          message={isEditMode ? 'Your recipe has been updated!' : 'Your recipe has been added!'}
          icon="success"
        />
      </Container>
    );
  };
  
  export default RecipeForm;