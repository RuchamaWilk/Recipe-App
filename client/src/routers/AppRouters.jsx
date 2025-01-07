import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/home-page/HomePage';
import Recipe from '../pages/recipe-page/recipePage';
import RecipeByCategory from '../pages/recipes-by-category-page/RecipeByCategoryPage'
import AddRecipePage from '../pages/add-recipe-page/AddRecipePage';
import SignInPage from '../pages/sign-in-page/SignInPage';
import ErrPage from '../pages/err-page/errPage'
import SignUpPage from '../components/sign-up/SignUp'
import SignUpPageChef from '../pages/sign-up-page/SignUpPageChef'
import ProtectedRoute from './ProtectedRouts';


function AppRouters() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/recipe/:id" element={<Recipe />} />
      <Route path="/category/:category" element={<RecipeByCategory />} />
      <Route path="nice"  />
      <Route path="/log-in" element={<SignInPage />} />
      <Route path="/user-sign-up" element={<SignUpPage/>} />
      <Route path="/chef-sign-up" element={<SignUpPageChef/>} /> 
      <Route path="*" element={<ErrPage errCode= "400" />} />
      <Route 
        path="/add-recipe" 
        element={
          <ProtectedRoute allowedTypes={['chef']}>
            <AddRecipePage />
          </ProtectedRoute>
        } 
      />

    </Routes>
  );
}

export default AppRouters;
