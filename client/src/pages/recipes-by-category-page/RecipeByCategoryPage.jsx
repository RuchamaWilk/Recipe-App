import React from 'react';
import { useLocation } from 'react-router-dom';
import RecipesGrid from '../recipes-grid-page/RecipesGridPage';

const RecipeByCategoryPage = () => {
  const location = useLocation();
  const recipes = location.state?.recipes || [];
  console.log("category: " ,recipes);
  return <RecipesGrid recipes={recipes} isUser={false} title="Recipes by Category" />;
};

export default RecipeByCategoryPage;
