import React from 'react';
import { Box, Typography } from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { useTheme, useMediaQuery } from '@mui/material';

const RecipeFormHeader = ({ isEditMode }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: { xs: 2, sm: 4 } }}>
      <RestaurantIcon sx={{ fontSize: { xs: 50, sm: 75 }, color: '#939185', mb: 2 }} />
      <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 'bold', color: 'text.primary', fontSize: { xs: '1.5rem', sm: '2rem' } }}>
        {isEditMode ? 'Edit Recipe' : 'Add New Recipe'}
      </Typography>
    </Box>
  );
};

export default RecipeFormHeader;