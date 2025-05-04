// Card.jsx (Main component)
import React, { useState, useEffect } from 'react';
import { Card as CardUi, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useUser } from '../../providers/UserProvider';
import SignInDialog from '../../components/sign-up-dialog/SignUpDialog';
import AlertDialog from '../alert-dialog/AlertDialog';
import { remove } from '../../services/apiService';
import CardHeader from './CardHeader';
import CardFooter from './CardFooter';
import './Card.css';

const Card = ({ recipe }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { user, setUser } = useUser();
  const [openDialog, setOpenDialog] = useState(false);
  const [openAlertDialog, setOpenAlertDialog] = useState(false);

  const isChef = user?._doc?._id === recipe.chefId._id;

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
    navigate(`/recipe/${recipe._id}`, { state: { recipe } });
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    navigate(`/recipe/edit/:${user._doc._id}`, { state: { recipe } });
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setOpenAlertDialog(true);
  };

  const handleConfirmDelete = () => {
    try {
      remove(recipe._id);
      const updatedChefRecipes = user.chefRecipes.filter((fav) => fav._id !== recipe._id);
      setUser({ ...user, chefRecipes: updatedChefRecipes });
      navigate('/');
    } catch (error) {
      console.error("Failed to delete recipe:", error);
    }
  };

  const handleCloseAlert = () => {
    setOpenAlertDialog(false);
  };

  const handleLoginRequired = () => {
    setOpenDialog(true);
  };

  const handleCloseSignIn = () => {
    setOpenDialog(false);
  };

  return (
    <CardUi
      className={`recipe-card ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={showRecipe}
    >
      <CardHeader
        recipe={recipe}
        isHovered={isHovered}
        isFavorite={isFavorite}
        setIsFavorite={setIsFavorite}
        isChef={isChef}
        onLoginRequired={handleLoginRequired}
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteClick}
      />
      
      <CardFooter recipe={recipe} />
      
      <Box 
        onClick={e => e.stopPropagation()} 
        sx={{ 
          position: 'relative', 
          zIndex: 1500 
        }}
      >
        <SignInDialog
          open={openDialog}
          onClose={handleCloseSignIn}
        />
        <AlertDialog
          open={openAlertDialog}
          onClose={handleCloseAlert}
          onConfirm={handleConfirmDelete}
        />
      </Box>
    </CardUi>
  );
};

Card.propTypes = {
  recipe: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avgTime: PropTypes.number.isRequired,
    chefId: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      userName: PropTypes.string.isRequired
    }).isRequired,
    ratings: PropTypes.shape({
      rating: PropTypes.number,
      reviewers: PropTypes.array
    })
  }).isRequired,
};

export default Card;