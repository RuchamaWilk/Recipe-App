import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/home-page/HomePage';
import Recipe from '../pages/recipe-page/recipePage';
import RecipeByCategory from '../pages/recipes-by-category-page/RecipeByCategoryPage'
import RecipeForm from '../pages/add-recipe-page/RecipeForm';
import ErrPage from '../pages/err-page/errPage'
import SignUpPageChef from '../pages/sign-up-page/SignUpPageChef'
import ProtectedRoute from './ProtectedRouts';
import MyFavoritePage from  '../pages/my-favorite-page/MyFavoritePage'
import ChefRecipesPage from '../pages/chef-recipes/chefRecipes'
import OurChefs from '../pages/our-Chefs/ourCefs';
import AboutUs from '../pages/about-us/AboutUs';

function AppRouters() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/our-chefs" element={<OurChefs />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/recipe/:id" element={<Recipe />} />
      <Route path="/category/:category" element={<RecipeByCategory />} />
      <Route path="/chef-sign-up" element={<SignUpPageChef/>} /> 
      <Route path="*" element={<ErrPage errCode= "400" />} />
      <Route path="/recipe/edit/:recipeId" element={<RecipeForm />} />
      <Route path="/add-recipe" 
        element={
          <ProtectedRoute allowedTypes={['chef']}>
            <RecipeForm />
          </ProtectedRoute>
        } 
      />
      <Route path="/favorite/:userID" 
        element={
          <ProtectedRoute allowedTypes={['user','chef']}>
            <MyFavoritePage />
          </ProtectedRoute>
        } 
      />
      <Route path="/chef/:userID" 
        element={
          <ProtectedRoute allowedTypes={['chef']}>
            <ChefRecipesPage />
          </ProtectedRoute>
        } 
      />

    </Routes>
  );
}

export default AppRouters;
