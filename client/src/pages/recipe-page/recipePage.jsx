import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchRecipesById } from '../../services/apiService';
import { Box, CircularProgress, Card, CardContent } from '@mui/material';
import RecipeHeader from "../../components/recipe/RecipeHeader";
import ChefRating from "../../components/recipe/ChefRating";
import RecipeInstructions from "../../components/recipe/RecipeInstructions";
import RecipeAIBox from "../../components/recipe/RecipeAIBox"


const Recipe = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
  
    useEffect(() => {
      const getRecipes = async () => {
        try {
          const fetchedRecipe = await fetchRecipesById(id);
          setRecipe(fetchedRecipe);
        } catch (error) {
          console.error('Error fetching recipe:', error);
        }
      };
      getRecipes();
    }, [id]);
  
    if (!recipe) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </Box>
      );
    }
  
    return (
      <Box sx={{ width: { xs: '80%', sm: '80%', md: '70%', xl: '50%' } }}>
        <Card>
          <RecipeHeader image={recipe.image} name={recipe.name} />
          <CardContent>
            <ChefRating chefId={recipe.chefId} />
            <Box sx={{ borderBottom: '1px solid #ddd', marginBottom: 4,marginTop: 2 }} />
            <RecipeInstructions ingredients={recipe.ingredients} instructions={recipe.instructions} />
            <RecipeAIBox/>
          </CardContent>
        </Card>
      </Box>
    );
  };
  
  export default Recipe;