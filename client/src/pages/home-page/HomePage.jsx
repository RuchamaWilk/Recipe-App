import React, { useEffect, useState } from 'react';
import RowCategory from '../../components/row-category/RowCategory';
import { fetchRecipes } from '../../services/apiService';
import { Box, Container } from '@mui/material'; // Container

const HomePage = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getRecipes = async () => {
      try {
        const recipes = await fetchRecipes();
        const grouped = recipes.reduce((acc, recipe) => {
          const { category } = recipe; // Direct access to category in the recipe object
          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push({
            ...recipe,
          });
          return acc;
        }, {});
        setCategories(grouped);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    getRecipes();
  }, []);
  

  return (
    <Container 
      maxWidth="md" // הגדרת רוחב קבוע
      sx={{
        '@media (min-width: 900px)':
         { maxWidth: '1420px', },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding:2, 
        marginX: 'auto' // שמירת הרוחב ביחס למרכז
      }}
    >
      {Object.keys(categories).map((category, index) => (
        <RowCategory
          key={index}
          category={category}
          recipes={categories[category]}
          sx={{ marginY: 2 }} 
        />
      ))}
    </Container>
  );
};

export default HomePage;
