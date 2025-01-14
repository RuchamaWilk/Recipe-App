import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from '../../components/card/Card';
import { Typography, Box } from '@mui/material';
import { useUser } from '../../providers/UserProvider'




const RecipesPage = ({ fetchFunction, isFavorite }) => {
  console.log("RecipesPage")
  const { category } = useParams(); // הוצאת ה-ID מתוך ה-URL
  const [recipesByCategory, setRecipesByCategory] = useState(null); // שמירה במצב על המתכון
  const { user } = useUser(); // שימוש ב-UserContext


  useEffect(() => {
    const getRecipes = async () => {
      try {
        console.log("getRecipes?")
        const userId = isFavorite ? user._id : null;
        const fetchedRecipes = await fetchFunction(isFavorite ? userId : category); 
        setRecipesByCategory(fetchedRecipes); 
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };
    getRecipes();
  }, [fetchFunction, category, user,isFavorite ]); 

  if (!recipesByCategory) {
    return <div>Loading...</div>;
  }

 

  return (
    <Box sx={{ 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center",
      width: "100%",
    }}>
      <Typography variant="h4" component="h1" sx={{ 
        textAlign: 'center',
        color: '#2F3645',
        marginBottom: "20px"
      }}>
        {isFavorite ? "My Favorites Recipes" : category}
      </Typography>
      
      <Box sx={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 300px)', // קובע מספר קבוע של טורים
        gap: '32px',
        justifyContent: 'center',
        maxWidth: "1500px",
        margin: "0 auto",
        // מוסיף תמיכה במסכים שונים
        '@media (max-width: 1400px)': {
          gridTemplateColumns: 'repeat(3, 300px)',
        },
        '@media (max-width: 1100px)': {
          gridTemplateColumns: 'repeat(2, 300px)',
        },
        '@media (max-width: 700px)': {
          gridTemplateColumns: 'repeat(1, 300px)',
        }
      }}>
        {recipesByCategory.map((item, index) => (
          <Box 
            key={index}
            sx={{ 
              width: '300px',
              height: 'fit-content'
            }}
          >
            <Card recipe={item} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default RecipesPage;
