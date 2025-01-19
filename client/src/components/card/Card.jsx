import React, { useState, useEffect } from 'react';
import { Card as CardUi, CardMedia, CardContent, CardActions, IconButton, Typography, Rating, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { addFavoriteRecipes, removeFavoriteRecipe, fetchRating } from '../../services/apiService';
import { useUser } from '../../providers/UserProvider';
import SignInDialog from '../../components/sign-up-dialog/SignUpDialog';
import './Card.css';

const mainColor = "#5d5b4f";

const Card = ({ recipe }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { user, setUser, fetchChefName } = useUser();
  const [chefName, setChefName] = useState('');
  const [rating, setRating] = useState('');
  const [ratingCount, setRatingCount] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const getChefName = async () => {
      const name = await fetchChefName(recipe.chefId);
      const { count, value } = await fetchRating(recipe._id);
      console.log(value);
      console.log(count);

      setChefName(name);
      setRating(value);
      setRatingCount(count);
    };
    getChefName();
  }, [recipe.chefId]);

  useEffect(() => {
    const updateFavoriteState = async () => {
      if (user) {
        const isFavoriteRecipe = user.favoriteRecipes.includes(recipe._id);
        setIsFavorite(isFavoriteRecipe);
      } else {
        setIsFavorite(false);
      }
    };
    updateFavoriteState();
  }, [user, recipe._id]);

  const showRecipe = () => {
    console.log(`chefName: ${chefName}`);
    navigate(`/recipe/${recipe._id}`, { state: { chefName } });
  };

  const handleFavoriteClick = async (e) => {
    e.stopPropagation();
    if (user) {
      try {
        if (isFavorite) {
          await removeFavoriteRecipe(user._id, recipe._id);
          setUser((prevUser) => ({
            ...prevUser,
            favoriteRecipes: prevUser.favoriteRecipes.filter((id) => id !== recipe._id),
          }));
        } else {
          await addFavoriteRecipes(user._id, recipe._id);
          setUser((prevUser) => ({
            ...prevUser,
            favoriteRecipes: [...prevUser.favoriteRecipes, recipe._id],
          }));
        }
      } catch (error) {
        console.error('Failed to update favorites:', error);
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
              {chefName}
            </Typography>
            <Typography variant="body2" className="cook-time">
              {`${recipe.avgTime} Min`}
            </Typography>
          </Box>

          <Box>
          <Typography variant="body2" className="raters-count" sx={{ textAlign: 'right' }}>
              {ratingCount} raters
            </Typography>
            <Rating
              name="recipe-rating"
              value={rating}
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