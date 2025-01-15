import React, { useState,useEffect } from 'react';
import {Card as CardUi,CardMedia,CardContent,CardActions,IconButton,Typography,Rating,Box,Chip,} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import {addFavoriteRecipes,removeFavoriteRecipe} from '../../services/apiService'
import {useUser} from '../../providers/UserProvider'

const Card = ({ recipe }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { user, setUser, fetchChefName } = useUser();
  const [chefName, setChefName] = useState('');


  /*useEffect(() => {
    const fetchChefName = async () => {
      try {
        const chefName = await getUserById(recipe.chefId); // קריאה ל-API
        setChefName(chefName.result); // עדכון שם השף במצב
      } catch (error) {
        console.error('Failed to fetch chef name:', error);
      }
    };
  
    fetchChefName();
  }, [recipe.chefId]);*/

  useEffect(() => {
    const getChefName = async () => {
      const name = await fetchChefName(recipe.chefId);
      setChefName(name);
    };
    getChefName();
  }, [recipe.chefId, fetchChefName]);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (user) {
        try {
          const favorites = user.favoriteRecipes // אוסף את רשימת המועדפים
          const isFavoriteRecipe = favorites.includes(recipe._id); // בודק אם המתכון ברשימה
          setIsFavorite(isFavoriteRecipe);
        } catch (error) {
          console.error('Failed to fetch favorites:', error);
        }
      }
    };
    fetchFavorites();
  }, [user, recipe._id]);

  const showRecipe = () => {
    navigate(`/recipe/${recipe._id}`);
  };



  const  handleFavoriteClick = async(e) => {
    e.stopPropagation();
    if(user){
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

    }
    else{
      console.log("here will be want to ssign up?")
    }

  };

  return (
    <CardUi
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={showRecipe}
      sx={{
        width: '100%', // Changed from fixed width to 100%
        height: 200,
        minWidth: "320px",
        position: 'relative',
        borderRadius: '12px',
        cursor: 'pointer',
        //overflow: 'hidden',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
        },
        bgcolor: '#ffffff',
        border: '1px solid rgba(0,0,0,0.08)',
      }}
    >
      {/* Image Container */}
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
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            padding: 0,
          }}
        >
          <IconButton
            onClick={handleFavoriteClick}
            sx={{
              bgcolor: 'rgba(255,255,255,0.9)',
              padding: '4px',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,1)',
                transform: 'scale(1.1)',
              },
              transition: 'all 0.2s ease',
            }}
          >
            <FavoriteIcon
              fontSize="small"
              sx={{
                color: isFavorite ? '#ff4444' : '#666',
                transition: 'color 0.2s ease',
              }}
            />
          </IconButton>
        </CardActions>
      </Box>

      {/* Content Container */}
      <CardContent 
        sx={{ 
          p: 1.5,
          height: '35%',
          display: 'flex',
          flexDirection: 'column',
          gap: 0.5,
          padding: "6px"
        }}
      >
        <Typography 
          variant="h5" 
          sx={{
            fontWeight: 600,
            fontSize: '0.9rem',
            overflow: 'hidden',
          }}
        >
          {recipe.name}
        </Typography>

        <Box 
          sx={{ 
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
          }}
        >
          <Chip
            icon={<AccessTimeIcon sx={{ fontSize: '0.7rem' }} />}
            label={`${recipe.avgTime} Min`}
            size="small"
            sx={{ 
              height: '16px',
              '& .MuiChip-label': {
                fontSize: '0.6rem',
                px: 1,
              },
              '& .MuiChip-icon': {
                ml: 0.5,
              },
            }}
          />
          <Chip
            icon={<PersonIcon sx={{ fontSize: '0.7rem' }} />}
            label={chefName}
            size="small"
            sx={{ 
              height: '16px',
              '& .MuiChip-label': {
                fontSize: '0.6rem',
                px: 1,
              },
              '& .MuiChip-icon': {
                ml: 0.5,
              },
            }}
          />
        </Box>

        <Rating 
          name="recipe-rating" 
          value={3} 
          readOnly
          size="small"
          sx={{
            '& .MuiRating-icon': {
              color: '#ffd700',
              fontSize: '0.8rem',
            }
          }}
        />
      </CardContent>
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