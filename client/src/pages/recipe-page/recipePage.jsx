import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchRecipesById } from '../../services/apiService';
import { Box, CircularProgress, Card, CardContent ,Container,Divider} from '@mui/material';
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
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <CircularProgress sx={{ color: '#4a6741' }} />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Card sx={{ 
        borderRadius: 4,
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        overflow: 'hidden'
      }}>
        <RecipeHeader image={recipe.image} name={recipe.name} />
        <CardContent sx={{ p: 4 }}>
          <ChefRating chefId={recipe.chefId} />
          <Divider sx={{ my: 3 }} />
          <RecipeInstructions 
            ingredients={recipe.ingredients} 
            instructions={recipe.instructions} 
          />
          <RecipeAIBox />
        </CardContent>
      </Card>
    </Container>
  );
};

  
  export default Recipe;