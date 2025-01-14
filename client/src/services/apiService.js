// client/src/services/api.jsx
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

// הפונקציה לקבלת המתכונים בקטגוריה מסוימת
export const fetchRecipes = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/recipes`);
    return response.data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
};

export const fetchRecipesById = async (id) => {
  try {
    console.log("HI WHAT ARE YOU DOING HERE?")
    const response = await axios.get(`${BASE_URL}/recipes/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching recipe by ID:', error);
    throw error;
  }
};

export const fetchRecipesByCategory = async (category) => {
  try {
    const response = await axios.get(`${BASE_URL}/recipes/category/${category}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
};

export const addRecipe = async (recipeData) => {
  
  console.log("add? " ,recipeData);
  try {
    const token = localStorage.getItem('token');
  if (!token) {
    console.error('No token found');
    return;
  }
  console.log('Token:', token);
    const response = await axios.post(`${BASE_URL}/recipes/add`,recipeData,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error adding recipe:', error);
    throw error;
  }
};

export const checkChef = async (email, password) => {
  try {
    console.log("api ",email)
    const response = await axios.post(`${BASE_URL}/auth/signIn`,{email,password});
    localStorage.setItem('user',JSON.stringify(response.data.user))
    localStorage.setItem('token', response.data.token)
    console.log("user??? " ,response.data.user)
    console.log("token??? " ,response.data.token)
    return response.data;
  } catch (error) {
    console.error('Error feching chefs:', error);
    throw error;
  }
};

export const addUserToDb = async (userName,email, password) => {
  try {
      const response = await axios.post(`${BASE_URL}/auth/signUp`,{userName,email,password});
      return response.data;
    } catch (error) {
      console.error('Error feching chefs:', error);
      throw error;
    }
};

export const addChefToDb = async (chefData) => {
  try {
      const response = await axios.post(`${BASE_URL}/auth/signUp/chef`,chefData);
      return response.data;
    } catch (error) {
      console.error('Error feching chefs:', error);
      throw error;
    }
};


export const fetchFavoriteRecipes = async (userId) => {
  try {
    console.log("Fetching favorite recipes for user:", userId);
    const response = await axios.get(`${BASE_URL}/auth/favorite/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
};

export const addFavoriteRecipes = async (userID, recipeID) => {
  try {
    console.log(`add favorite recipes to user:  ${userID} and recipe id: ${recipeID}`);
    const response = await axios.post(`${BASE_URL}/auth/addFavorite`,{userID,recipeID});
    return response.data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
};









