import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchRecipesById } from '../../services/api';
import { Box, Typography, Card, CardMedia, CardContent, CardActions, Button, List, ListItem, ListItemText, CircularProgress,CardHeader } from '@mui/material';




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
    <Box sx={{ maxWidth: '1000px', margin: 'auto', padding: 2 }}>
      <Card>
      <CardHeader
          title={
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Typography variant="h4" component="h1" gutterBottom>{recipe.name}</Typography>
            </Box>
          }
        />
      
        <CardMedia
          component="img"
          height="250"
          image={recipe.image}
          alt={recipe.name}
        />
        <CardContent>
          <Typography variant="h5" component="div">
            Ingredients
          </Typography>
          <List>
            {recipe.ingredients.map((item, index) => (
              <ListItem key={index}>
                <ListItemText primary={`${item.amount} ${item.name}`} />
              </ListItem>
            ))}
          </List>
          <Typography variant="h5" component="div" sx={{ marginTop: 2 }}>
            Instructions
          </Typography>
          <List>
            {recipe.instructions.map((item, index) => (
              <ListItem key={index}>
                <ListItemText primary={`${index + 1}. ${item.name}`} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Recipe;
