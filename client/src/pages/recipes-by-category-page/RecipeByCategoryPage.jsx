import React from 'react';
import RecipesPage from '../../pages/recipes-page/RecipesPage';
import { fetchRecipesByCategory } from '../../services/apiService';

const RecipeByCategoryPage = () => {
  console.log("RecipeByCategoryPage")
  return (
    <RecipesPage fetchFunction={fetchRecipesByCategory} isFavorite={false} />
  );
};

export default RecipeByCategoryPage;
