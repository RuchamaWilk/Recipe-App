import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/homePage/HomePage';
import Recipe from '../components/recipe/Recipe';
import RecipeByCategory from '../pages/recipesByCategoryPage/RecipeByCategoryPage'
import AddRecipePage from '../pages/addRecipePage/AddRecipePage';
import LogInPage from '../pages/logInPage/logInPage';



function AppRouters() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/recipe/:id" element={<Recipe />} />
      <Route path="/category/:category" element={<RecipeByCategory />} />
      <Route path="nice"  />
      <Route path="/add-recipe" element={<AddRecipePage />} />
      <Route path="/login" element={<LogInPage />} />

    </Routes>
  );
}

export default AppRouters;
