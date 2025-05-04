// CardHeader.jsx
import React from 'react';
import { Box, CardMedia, CardActions, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteButton from './FavoriteButton';

const CardHeader = ({ 
  recipe, 
  isHovered, 
  isFavorite, 
  setIsFavorite, 
  isChef, 
  onLoginRequired,
  onEditClick,
  onDeleteClick 
}) => {
  return (
    <Box className="media-container">
      <CardMedia
        component="img"
        image={recipe.image}
        alt={recipe.name}
        className={`card-media ${isHovered ? 'hovered' : ''}`}
      />
      <CardActions className="favorite-button-container">
        <FavoriteButton 
          recipeId={recipe._id}
          isFavorite={isFavorite}
          setIsFavorite={setIsFavorite}
          onLoginRequired={onLoginRequired}
        />
        {isChef && (
          <Box sx={{ display: 'flex', gap: '8px' }}>
            <IconButton
              onClick={onEditClick}
              className="favorite-button"
            >
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton
              onClick={onDeleteClick}
              className="favorite-button"
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        )}
      </CardActions>
    </Box>
  );
};

export default CardHeader;