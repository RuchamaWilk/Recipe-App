import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchRecipesById } from '../../services/apiService';
import Rating from '@mui/material/Rating';
import { Box, Typography, Card, CardMedia, CardContent, List, ListItem, ListItemText, CircularProgress,CardHeader } from '@mui/material';

const Recipe = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [value, setValue] = useState(0);
  
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

  const handleRatingChange = (event, newValue) => {
    setValue(newValue);
    console.log("New rating value:", newValue);  // לוודא שהערך שנשלח הוא מספר
    //send the value rate to DB of recipe
  };

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
          <Box sx={{ position: 'relative' }}>
            <CardMedia component="img" height="250" image={recipe.image} alt={recipe.name}/>
            <Box sx={{ color: "#EEEDEB", position: 'absolute', top: '24vh', left: '16px', padding: '8px 16px',
                borderRadius: '4px', textShadow: '-3px 1px 8px #939185'}}>
                  <Typography variant="h4" component="h1" gutterBottom  sx={{ fontSize: "60px",fontFamily: "cursive",}}>
                    {recipe.name}
                  </Typography>
            </Box>
        </Box>
        <CardContent>
          <Box  sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6"  > from: {recipe.chefId } </Typography>
              <Rating name="no-value" 
                  onChange={handleRatingChange}
                  value= {value}/>   
          </Box>
          <Box sx={{ borderBottom: '1px solid #ddd', marginBottom: 4,marginTop: 2 }} />
          <Typography variant="h5" component="div" sx={{ marginTop: 2 }}> Ingredients</Typography>
          <List>
            {recipe.ingredients.map((item, index) => (
              <ListItem key={index}>
                <ListItemText primary={`${item.amount} ${item.name}`} />
              </ListItem>
            ))}
          </List>
          <Typography variant="h5" component="div" sx={{ marginTop: 2 }}> Instructions </Typography>
          <List>
            {recipe.instructions.map((item, index) => (
              <ListItem key={index}>
                <ListItemText primary={`${index + 1}. ${item.name}`} />
              </ListItem>
            ))}
          </List>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
            <Box 
              sx={{ width: "50vw", height: "20vh", backgroundColor: '#EEEDEB',borderRadius: '4px',marginTop: 2}}>
              <Typography variant="h6" >AI</Typography>
            </Box>
          </Box>

        </CardContent>
      </Card>
    </Box>
  );
};

export default Recipe;
