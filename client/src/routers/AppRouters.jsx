import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/home-page/HomePage';
import Recipe from '../pages/recipe-page/recipePage';
import RecipeByCategory from '../pages/recipes-by-category-page/RecipeByCategoryPage'
import AddRecipePage from '../pages/add-recipe-page/AddRecipePage';
import LogInPage from '../pages/log-in-page/logInPage';
import ErrPage from '../pages/err-page/errPage'
import SignUpPage from '../components/sign-up/SignUp'
import ChefSignUpForm from '../pages/sign-up-page/SignUpPageChef'


function AppRouters() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/recipe/:id" element={<Recipe />} />
      <Route path="/category/:category" element={<RecipeByCategory />} />
      <Route path="nice"  />
      <Route path="/add-recipe" element={<AddRecipePage />} />
      <Route path="/log-in" element={<LogInPage />} />
      <Route path="/user-sign-up" element={<SignUpPage/>} />
      <Route path="/chef-sign-up" element={<ChefSignUpForm/>} /> 
      <Route path="*" element={<ErrPage errCode= "400" />} />


    </Routes>
  );
}

export default AppRouters;
