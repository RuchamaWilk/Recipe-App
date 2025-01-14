import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Card from '../../components/card/Card';
import { Typography, Box } from '@mui/material';
import { jwtDecode } from "jwt-decode";




const RecipesPage = ({ fetchFunction, isFavorite }) => {
  console.log("RecipesPage")
  const { category } = useParams(); // הוצאת ה-ID מתוך ה-URL
  const [recipesByCategory, setRecipesByCategory] = useState(null); // שמירה במצב על המתכון
  const navigate = useNavigate();

  const getUserIdFromToken=()=>{
    console.log("getUserIdFromToken?")
    const token = localStorage.getItem('token');
    if (!token) {
      console.error("Token not found");
      return null;
    }
    const decodedToken = jwtDecode(token);
    console.log(decodedToken._id)
    return decodedToken._id;

  }

  useEffect(() => {
    const getRecipes = async () => {
      try {
        console.log("getRecipes?")
        const userId = isFavorite ? getUserIdFromToken() : null;
        const fetchedRecipes = await fetchFunction(isFavorite ? userId : category); 
        setRecipesByCategory(fetchedRecipes); 
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };

    getRecipes();
  }, [fetchFunction, category]); // הפעלת useEffect כאשר ה-ID משתנה

  if (!recipesByCategory) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ display: "grid", gridTemplateColumns:"auto", placeItems: 'center'}}>
      <Typography variant="h4" component="h1"  sx={{ 
          textAlign: 'center',  // מרכז את הטקסט
           color: '#2F3645' ,
        }}>{category}</Typography>
      
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: '8px', flexWrap: 'wrap' }}>
        {recipesByCategory.map((item, index) => (
          <Box 
            key={index}
          >
            <Card sx= {{width: "33%"}}recipe={item} />
          </Box>
        ))}
        </Box>
      </Box>
      
  );
};

export default RecipesPage;
