import React from "react";
import { Box, Typography, List, ListItem, ListItemText, Paper, Chip } from "@mui/material";
import { Kitchen, RestaurantMenu } from "@mui/icons-material";
import PropTypes from "prop-types";

const RecipeInstructions = ({ ingredients, instructions }) => {
  return (
    <Box sx={{ mt: 4 }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 3, 
          borderRadius: 2, 
          bgcolor: "#FFFAF6", 
          border: "1px solid #E6B9A6",
          mb: 4,
          position: "relative"
        }}
      >
        <Typography 
          variant="h6" 
          sx={{ 
            mb: 3, 
            display: "flex", 
            alignItems: "center", 
            gap: 1, 
            color: "#B25E45", 
            fontWeight: 600,
            borderBottom: "2px solid #E6B9A6",
            pb: 1
          }}
        >
          <Kitchen sx={{ color: "#E6B9A6" }} />
          Ingredients
        </Typography>

        <Box 
          sx={{ 
            bgcolor: "#FFF", 
            p: 2, 
            borderRadius: 2,
            boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
            borderTop: "3px solid #E6B9A6"
          }}
        >
          <List sx={{ p: 0 }}>
            {ingredients.map((item, index) => (
              <ListItem
                key={index}
                sx={{
                  py: 1,
                  px: 0,
                  borderBottom: index !== ingredients.length - 1 ? '1px solid #eee' : 'none'
                }}
              >
                <ListItemText
                  primary={
                    <Typography sx={{ fontWeight: 500, color: "#555", display: "flex", alignItems: "center" }}>
                      <Chip 
                        label="•" 
                        size="small" 
                        sx={{ 
                          mr: 1,
                          bgcolor: "#E6B9A6", 
                          color: "#FFF",
                          minWidth: "24px",
                          height: "24px"
                        }} 
                      />
                      {`${item.amount} ${item.name}`}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Paper>

      <Paper 
        elevation={3} 
        sx={{ 
          p: 3, 
          borderRadius: 2, 
          bgcolor: "#FFFAF6", 
          border: "1px solid #E6B9A6",
          position: "relative"
        }}
      >
        <Typography 
          variant="h6" 
          sx={{ 
            mb: 3, 
            display: "flex", 
            alignItems: "center", 
            gap: 1, 
            color: "#B25E45", 
            fontWeight: 600,
            borderBottom: "2px solid #E6B9A6",
            pb: 1
          }}
        >
          <RestaurantMenu sx={{ color: "#E6B9A6" }} />
          Instructions
        </Typography>

        <Box 
          sx={{ 
            bgcolor: "#FFF", 
            p: 2, 
            borderRadius: 2,
            boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
            borderTop: "3px solid #E6B9A6"
          }}
        >
          <List sx={{ p: 0 }}>
            {instructions.map((item, index) => (
              <ListItem
                key={index}
                sx={{
                  py: 2,
                  px: 0,
                  borderBottom: index !== instructions.length - 1 ? '1px solid #eee' : 'none'
                }}
              >
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', gap: 2, alignItems: "flex-start" }}>
                      <Typography
                        sx={{
                          bgcolor: '#E6B9A6',
                          color: 'white',
                          width: 28,
                          height: 28,
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          fontWeight: 600
                        }}
                      >
                        {index + 1}
                      </Typography>
                      <Typography sx={{ color: "#555" }}>{item.name}</Typography>
                    </Box>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Paper>
    </Box>
  );
};

RecipeInstructions.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.shape({
    amount: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  instructions: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
  })).isRequired,
};

export default RecipeInstructions;