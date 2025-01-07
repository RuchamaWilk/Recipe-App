// client/src/services/api.jsx
import axios from 'axios';
//import verifyJwt from '../../../server/utils/jwt';

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
    const response = await axios.get(`${BASE_URL}/recipes/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
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
  //const tokenReg=  verifyJwt(token);
  //console.log('Token:', tokenReg);
  //recipeData.chefId= token._id;
  //console.log(token._id)
    const response = await axios.post(`${BASE_URL}/recipes/add`,recipeData,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    console.log("now??? " ,response)
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
    localStorage.setItem('token', response.data.token);
    console.log("now??? " ,response.data)
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





