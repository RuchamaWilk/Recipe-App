import React from 'react';
import { Box, Typography } from '@mui/material';
import Card from '../../components/card/Card';

const RecipesGrid = ({ recipes, isChef, title }) => {
  const mainColor = "#5d5b4f";

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
        marginBottom: "40px",
        marginTop: "20px"
      }}>
        {title}
      </Typography>

      {recipes.length === 0 ? (
        <Typography variant="h6" sx={{
          textAlign: 'center',
          color: mainColor,
        }}>
          { "No recipes found"}
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
              <Card recipe={item } />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default RecipesGrid;
