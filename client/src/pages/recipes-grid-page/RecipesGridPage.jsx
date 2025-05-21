import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/card/Card';

const RecipesGrid = ({ recipes, isChef, title }) => {
  const mainColor = "#5d5b4f";
  const navigate = useNavigate();

  const handleAddRecipe = () => {
    navigate('/add-recipe');
  };

  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
    }}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        width: '100%',
        marginBottom: "40px",
        marginTop: "20px"
      }}>
        <Typography variant="h4" component="h1" sx={{
          textAlign: 'center',
          color: mainColor,
        }}>
          {title}
        </Typography>
        
        {title === "My Recipes" && (
          <Button 
            variant="contained" 
            onClick={handleAddRecipe}
            sx={{ 
              backgroundColor: mainColor,
              color: 'white',
              position: 'absolute',
              right: '20px',
              '&:hover': { 
                backgroundColor: '#47453c' 
              } 
            }}
          >
            ADD RECIPE
          </Button>
        )}
      </Box>

      {recipes.length === 0 ? (
        <Typography variant="h6" sx={{
          textAlign: 'center',
          color: mainColor,
        }}>
          {"No recipes found"}
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

export default RecipesGrid;