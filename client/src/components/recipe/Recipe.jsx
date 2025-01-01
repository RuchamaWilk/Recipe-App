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
    <Box sx={{width: { xs: '80%', sm: '80%', md: "70%",xl: '50%' }}}>
          <Box sx={{ position: 'relative' }}>
            <CardMedia component="img" height="250"  image={recipe.image} alt={recipe.name} sx={{ filter: "brightness(50%)"}}/>
            <Box sx={{ color: "#EEEDEB", position: 'absolute', top: '7%', left: '5%',
                 textShadow: '-3px 1px 8px #939185'}}>
                  <Typography variant="h3" >
                    {recipe.name}
                  </Typography>
            </Box>
          </Box>
        <CardContent sx={{ paddingLeft: "25px"}}>
          <Box  sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography  > from: {recipe.chefId } </Typography>
              <Rating name="no-value" onChange={handleRatingChange} value= {value} size= "large" />   
          </Box>
          <Box sx={{ borderBottom: '1px solid #ddd', marginBottom: 4,marginTop: 2 }} />
            <Typography variant="h5"  sx={{ marginTop: 2 }}> Ingredients</Typography>
            <List>
              {recipe.ingredients.map((item, index) => (
                <ListItem key={index}>
                  <ListItemText primary={`•  ${item.amount} ${item.name}`} />
                </ListItem>
              ))}
            </List>
            <Typography variant="h5"  sx={{ marginTop: 2 }}> Instructions </Typography>
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
        </Box>
  );
};

export default Recipe;
