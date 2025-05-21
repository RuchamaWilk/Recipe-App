import React from 'react';
import { Box, Typography, TextField } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';

const RecipeImageField = ({ image, imageError, handleChange, isMobile }) => {
  return (
    <Box sx={{ gridColumn: { xs: '1', sm: '1 / 3' } }}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        p: 3,
        border: '1px dashed #ccc',
        borderRadius: '4px',
        backgroundColor: '#f9f9f9'
      }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
          Recipe Image
        </Typography>
        
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            fullWidth
            label="Image URL"
            name="image"
            value={image}
            onChange={handleChange}
            required
            variant="outlined"
            size={isMobile ? "small" : "medium"}
            error={!!imageError}
            helperText={imageError}
            placeholder="https://example.com/your-image.jpg"
          />
        </Box>
        
        {image ? (
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            width: '100%',
            mt: 2
          }}>
            <img 
              src={image} 
              alt="Recipe preview" 
              style={{ 
                maxWidth: '100%', 
                maxHeight: '200px', 
                objectFit: 'contain',
                borderRadius: '4px'
              }} 
            />
          </Box>
        ) : (
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100px'
          }}>
            <ImageIcon sx={{ fontSize: 60, color: '#939185', mb: 2 }} />
            <Typography variant="body1" color="text.secondary">
              Enter an image URL above
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default RecipeImageField;