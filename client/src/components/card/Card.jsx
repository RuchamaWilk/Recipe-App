import React, { useState, useEffect } from 'react';
import { Card as CardUi, CardMedia, CardContent, CardActions, IconButton, Typography, Rating, Box, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { addFavoriteRecipes, removeFavoriteRecipe } from '../../services/apiService';
import { useUser } from '../../providers/UserProvider';
import SignInDialog from '../../components/signInDialog/SignInDialog';

const Card = ({ recipe }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { user, setUser, fetchChefName } = useUser();
  const [chefName, setChefName] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const getChefName = async () => {
      const name = await fetchChefName(recipe.chefId);
      setChefName(name);
    };
    getChefName();
  }, [recipe.chefId, fetchChefName]);

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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={showRecipe}
      sx={{
        width: '100%',
        height: 200, // Updated height
        minWidth: "320px",
        position: 'relative',
        borderRadius: '12px',
        cursor: 'pointer',
        overflow: 'hidden',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
        },
        bgcolor: '#ffffff',
        border: '1px solid rgba(0,0,0,0.08)',
        boxShadow: '0 4px 16px rgba(0,0,0,0.1)' // Adding shadow for style
      }}
    >
      <Box sx={{ position: 'relative', height: '65%' }}>
        <CardMedia
          component="img"
          image={recipe.image}
          alt={recipe.name}
          sx={{
            height: '100%',
            transition: 'transform 0.3s ease-in-out',
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          }}
        />
        <CardActions
          sx={{ position: 'absolute', top: 8, right: 8, padding: 0 }}
        >
          <IconButton
            onClick={handleFavoriteClick}
            sx={{
              bgcolor: 'rgba(255,255,255,0.9)',
              padding: '4px',
              '&:hover': { bgcolor: 'rgba(255,255,255,1)', transform: 'scale(1.1)' },
              transition: 'all 0.2s ease'
            }}
          >
            <FavoriteIcon
              fontSize="small"
              sx={{ color: isFavorite ? '#ff4444' : '#666', transition: 'color 0.2s ease' }}
            />
          </IconButton>
        </CardActions>
      </Box>

      <CardContent
        sx={{ p: 1.5, height: '35%', display: 'flex', flexDirection: 'column', padding: '8px' }}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: 600, fontSize: '1.3rem' }}
        >
          {recipe.name}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: "8px", marginBottom: 0, justifyContent: 'space-between' }}>
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
    <Typography
      variant="body2"
      sx={{ fontWeight: 400, fontSize: '0.9rem', color: '#666', borderRight: '1px solid #ccc', paddingRight: '8px' }}
    >
      {chefName}
    </Typography>
    <Typography
      variant="body2"
      sx={{ fontWeight: 400, fontSize: '0.9rem', color: '#666' }}
    >
      {`${recipe.avgTime} Min`}
    </Typography>
  </Box>

  <Rating
    name="recipe-rating"
    value={3}
    size="small"
    readOnly
    sx={{ '& .MuiRating-icon': { color: '#ffd700', fontSize: '1rem' } }}
  />
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