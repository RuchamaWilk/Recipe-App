import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

// הפונקציה לקבלת כל הקטגוריות
const fetchCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

// הפונקציה לקבלת המתכונים בקטגוריה מסוימת
const fetchRecipes = async (categoryName) => {
  try {
    const response = await axios.get(`${BASE_URL}/recipes/${categoryName}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
};

// הפונקציה לקבלת פרטי המתכון (לפי שם המתכון)
const fetchRecipe = async (recipeName) => {
  try {
    const response = await axios.get(`${BASE_URL}/recipe/${recipeName}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching recipe:', error);
    throw error;
  }
};

export default {
  fetchCategories,
  fetchRecipes,
  fetchRecipe
};
