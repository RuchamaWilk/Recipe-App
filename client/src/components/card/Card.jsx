import React, { useState, useEffect } from 'react';
import { Card as CardUi, CardMedia, CardContent, CardActions, IconButton, Typography, Rating, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { addFavoriteRecipes, removeFavoriteRecipe } from '../../services/apiService';
import { useUser } from '../../providers/UserProvider';
import SignInDialog from '../../components/sign-up-dialog/SignUpDialog';
import './Card.css';

const mainColor = "#5d5b4f";

const Card = ({ recipe }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { user, setUser, token } = useUser();
  const [openDialog, setOpenDialog] = useState(false);
 const value= recipe.ratings? recipe.ratings.rating/recipe.ratings.reviewers.length: 0;
  const countRates= recipe.ratings? recipe.ratings.reviewers.length: 0;

  //console.log("recipe.chefId.userName: ",recipe.chefId.userName)
  

  useEffect(() => {
    const updateFavoriteState = async () => {
      if (user) {
        const isFavoriteRecipe = user._doc.favoriteRecipes.includes(recipe._id);
        setIsFavorite(isFavoriteRecipe);
      } else {
        setIsFavorite(false);
      }
    };
    updateFavoriteState();
  }, [user, recipe._id]);

  const showRecipe = () => {
    navigate(`/recipe/${recipe._id}`,{ state: { recipe}});
  };

  const handleFavoriteClick = async (e) => {
    e.stopPropagation();
    if (user) {
      try {
        let updatedFavorites, updatedFavoritesDoc;
  
        if (isFavorite) {
          // הסרת מתכון מהמועדפים
          await removeFavoriteRecipe(user._doc._id, recipe._id, token);
  
          updatedFavorites = user.favoriteRecipes.filter((fav) => fav._id !== recipe._id);
          updatedFavoritesDoc = user._doc.favoriteRecipes.filter((id) => id !== recipe._id);
        } else {
          // הוספת מתכון למועדפים
          const addedRecipe = await addFavoriteRecipes(user._doc._id, recipe._id, token);
          console.log("addedRecipe ", addedRecipe)
          updatedFavorites = [...user.favoriteRecipes, addedRecipe];
          updatedFavoritesDoc = [...user._doc.favoriteRecipes, recipe._id];
        }
  
        // עדכון המשתמש ב-state
        setUser({
          ...user,
          favoriteRecipes: updatedFavorites,
          _doc: {
            ...user._doc,
            favoriteRecipes: updatedFavoritesDoc,
          },
        });
        console.log("favoriteRecipes ", user.favoriteRecipes)
        console.log("favoriteRecipes doc ", user._doc.favoriteRecipes)
        setIsFavorite(!isFavorite);
      } catch (error) {
        console.error("Failed to update favorites:", error);
      }
    } else {
      setOpenDialog(true);
    }
  };
  
  

  const handleDialogClick = (e) => {
    e.stopPropagation();
  };

  return (
    <CardUi
      className={`recipe-card ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={showRecipe}
    >
      <Box className="media-container">
        <CardMedia
          component="img"
          image={recipe.image}
          alt={recipe.name}
          className={`card-media ${isHovered ? 'hovered' : ''}`}
        />
        <CardActions className="favorite-button-container">
          <IconButton
            onClick={handleFavoriteClick}
            className="favorite-button"
          >
            <FavoriteIcon
              fontSize="small"
              className={`favorite-icon ${isFavorite ? 'favorited' : ''}`}
            />
          </IconButton>
        </CardActions>
      </Box>
      <CardContent className="card-content">
        <Typography variant="h5" className="recipe-title">
          {recipe.name}
        </Typography>

        <Box className="recipe-details">
          <Box className="chef-time-container">
            <Typography variant="body2" className="chef-name">
              {recipe.chefId.userName}
            </Typography>
            <Typography variant="body2" className="cook-time">
              {`${recipe.avgTime} Min`}
            </Typography>
          </Box>

          <Box>
          <Typography variant="body2" className="raters-count" sx={{ textAlign: 'right' }}>
              {countRates} raters
            </Typography>
            <Rating
              name="recipe-rating"
              value={value}
            
              size="small"
              readOnly
              className="recipe-rating"
            />
          </Box>
        </Box>
      </CardContent>
      
      <SignInDialog
        open={openDialog}
        onClose={(e) => {
          handleDialogClick(e);
          setOpenDialog(false);
        }}
        onClick={handleDialogClick}
      />
    </CardUi>
  );
};

Card.propTypes = {
  recipe: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avgTime: PropTypes.number.isRequired,
    chefId: PropTypes.string.isRequired,
  }).isRequired,
};

export default Card;