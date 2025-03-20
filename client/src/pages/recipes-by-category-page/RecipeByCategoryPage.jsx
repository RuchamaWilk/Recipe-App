import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import RecipesGrid from '../recipes-grid-page/RecipesGridPage';

const RecipeByCategoryPage = () => {
  const location = useLocation();
  const {category}= useParams()
  const recipes = location.state?.recipes || [];
  return <RecipesGrid recipes={recipes} isChef={false} title={category} />;
};

export default RecipeByCategoryPage;
