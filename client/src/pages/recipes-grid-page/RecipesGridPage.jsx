import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from '../../components/card/Card';
import { Typography, Box } from '@mui/material';
import { useUser } from '../../providers/UserProvider'

const mainColor = "#5d5b4f";



const RecipesPage = ({ fetchFunction, isFavorite }) => {
  console.log("RecipesPage")
  const { category } = useParams(); // הוצאת ה-ID מתוך ה-URL
  const [recipes, setRecipes] = useState(null); // שמירה במצב על המתכון
  const { user } = useUser();


  useEffect(() => {
    const getRecipes = async () => {
      try {
        const fetchedRecipes = await fetchFunction(isFavorite ? user._id : category); 
        setRecipes(fetchedRecipes); 
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };
    getRecipes();
  }, [fetchFunction, category, user,isFavorite ]); 

  if (!recipes) {
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
        color: mainColor,
        marginBottom: "20px"
      }}>
        {isFavorite ? "My Favorites Recipes" : category}
      </Typography>
      
      {recipes.length === 0 ? (
        <Typography variant="h6" sx={{ 
          textAlign: 'center',
          color: mainColor,
        }}>
          {isFavorite ? "You have not selected any favorite recipes yet." : "No recipes found in this category."}
        </Typography>
      ) : (
        <Box sx={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 300px)', 
          gap: '32px',
          justifyContent: 'center',
          maxWidth: "1500px",
          margin: "0 auto",
          marginBottom: "30px",
          '@media (max-width: 1400px)': {
            gridTemplateColumns: 'repeat(3, 320px)',
          },
          '@media (max-width: 1100px)': {
            gridTemplateColumns: 'repeat(2, 300px)',
          },
          '@media (max-width: 700px)': {
            gridTemplateColumns: 'repeat(1, 320px)',
          }
        }}>
          {recipes.map((item, index) => (
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
      )}
    </Box>
  );
};

export default RecipesPage;
