import React from 'react';
import { useUser } from '../../providers/UserProvider';
import RecipesGrid from '../recipes-grid-page/RecipesGridPage';
import { useNavigate } from 'react-router-dom';

const ChefRecipesPage = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  if(user._doc.type!= 'chef')
  {
    navigate('/*')
  }
  return <RecipesGrid recipes={user.chefRecipes} isChef={true} title="My Recipes"  />;
};

export default ChefRecipesPage;
