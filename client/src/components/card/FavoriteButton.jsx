import React from 'react';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { addFavoriteRecipes, removeFavoriteRecipe } from '../../services/apiService';
import { useUser } from '../../providers/UserProvider';

const FavoriteButton = ({ 
  recipeId, 
  isFavorite, 
  setIsFavorite,
  onLoginRequired 
}) => {
  
  const { user, setUser, token } = useUser();

  const handleFavoriteClick = async (e) => {
    e.stopPropagation();
    if (user) {
      try {
        let updatedFavorites, updatedFavoritesDoc;
        if (isFavorite) {
          await removeFavoriteRecipe(user._doc._id, recipeId, token);
          updatedFavorites = user.favoriteRecipes.filter((fav) => fav._id !== recipeId);
          updatedFavoritesDoc = user._doc.favoriteRecipes.filter((id) => id !== recipeId);
        } else {
          const addedRecipe = await addFavoriteRecipes(user._doc._id, recipeId, token);
          updatedFavorites = [...user.favoriteRecipes, addedRecipe];
          updatedFavoritesDoc = [...user._doc.favoriteRecipes, recipeId];
        }
        setUser({
          ...user,
          favoriteRecipes: updatedFavorites,
          _doc: {
            ...user._doc,
            favoriteRecipes: updatedFavoritesDoc,
          },
        });
        setIsFavorite(!isFavorite);
      } catch (error) {
        console.error("Failed to update favorites:", error);
      }
    } else {
      onLoginRequired();
    }
  };

  return (
    <IconButton
      onClick={handleFavoriteClick}
      className="favorite-button"
    >
      <FavoriteIcon
        fontSize="small"
        className={`favorite-icon ${isFavorite ? 'favorited' : ''}`}
      />
    </IconButton>
  );
};

export default FavoriteButton;