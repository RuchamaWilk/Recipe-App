import React, {  useState } from 'react';
import { useUser } from '../../providers/UserProvider';
import RecipesGrid from '../recipes-grid-page/RecipesGridPage';

const MyFavoritePage = () => {
  const { user } = useUser();
  return <RecipesGrid recipes={user.favoriteRecipes} isUser={true} title="My Favorite Recipes" />;
};

export default MyFavoritePage;
