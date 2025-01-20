import React from 'react';
import RecipesPage from '../../pages/recipes-grid-page/RecipesGridPage';
import { useLocation } from 'react-router-dom';


const RecipeByCategoryPage = () => {
  console.log("RecipeByCategoryPage")
  const location = useLocation(); 
  const recipes = location.state?.recipes
console.log("recipes ", recipes)
  return (
    <RecipesPage recipes={recipes} isFavorite={false} />
  );
};

export default RecipeByCategoryPage;
