
import React from 'react';
import RecipesPage from '../../pages/recipes-page/RecipesPage';
import { fetchFavoriteRecipes } from '../../services/apiService';

const MyFavoritePage = () => {
  console.log("MyFavoritePage")

  return (
    <RecipesPage fetchFunction={fetchFavoriteRecipes}  isFavorite={true} />
  );
};

export default MyFavoritePage;
