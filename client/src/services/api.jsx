// client/src/services/api.jsx
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

// הפונקציה לקבלת המתכונים בקטגוריה מסוימת
export const fetchRecipes = async () => {
  try {
    const response = await axios.get(`${BASE_URL}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
};

export const fetchRecipesById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/recipes/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
};

export const fetchRecipesByCategory = async (category) => {
  try {
    const response = await axios.get(`${BASE_URL}/category/${category}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
};

export const addRecipe = async (recipeData) => {
  try {
    const response = await axios.post(`${BASE_URL}/recipes`,recipeData);
    return response.data;
  } catch (error) {
    console.error('Error adding recipe:', error);
    throw error;
  }
};