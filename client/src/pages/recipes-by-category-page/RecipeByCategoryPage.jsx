import React from 'react';
import { useLocation } from 'react-router-dom';
import RecipesGrid from '../recipes-grid-page/RecipesGridPage';

const RecipeByCategoryPage = () => {
  const location = useLocation();
  const recipes = location.state?.recipes || [];
  return <RecipesGrid recipes={recipes} isChef={false} title="Recipes by Category" />;
};

export default RecipeByCategoryPage;
