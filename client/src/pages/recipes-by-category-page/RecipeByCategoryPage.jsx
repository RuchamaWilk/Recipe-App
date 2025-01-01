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
    <Container sx={{ width: "2000px"}} >
      <Typography variant="h4" component="h1"  sx={{ 
          textAlign: 'center',  // מרכז את הטקסט
          marginBottom: '40px',  // מרווח גדול יותר בין הכותרת לכרטיסים
          fontFamily: 'Dancing Script, cursive', // הגדרת פונט סקריפט
           color: '#2F3645' ,
          fontSize: '3rem', // גודל כותרת גדול יותר
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
      </Container>
      
  );
};

export default RecipeByCategory;
