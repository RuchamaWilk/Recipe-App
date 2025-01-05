import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchRecipesByCategory } from '../../services/apiService'; // ייבוא הפונקציה
import Card from '../../components/card/Card';
import { Typography, Box, Container } from '@mui/material';

const RecipeByCategory = () => {
  const { category } = useParams(); // הוצאת ה-ID מתוך ה-URL
  const [recipesByCategory, setRecipesByCategory] = useState(null); // שמירה במצב על המתכון
  const navigate = useNavigate();

  useEffect(() => {
    const getRecipes = async () => {
      try {
        const fetchedRecipes = await fetchRecipesByCategory(category); // קריאה ל-API
        setRecipesByCategory(fetchedRecipes); // עדכון המצב במתכון
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };

    getRecipes();
  }, [category]); // הפעלת useEffect כאשר ה-ID משתנה

  if (!recipesByCategory) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ display: "grid", gridTemplateColumns:"auto" }}>
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

export default RecipeByCategory;
