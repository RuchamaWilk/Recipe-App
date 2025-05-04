// client/src/services/api.jsx
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});



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

export const addRecipe = async (recipeData) => {
    try { 
    const response = await axios.post(`${BASE_URL}/recipes/add`,
    recipeData,
    {});
    return response.data;
  } catch (error) {
    console.error('Error adding recipe:', error);
    throw error;
  }
};

export const signIn = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/signIn`, { email, password });
    console.log("api", response.data);
    return response.data;
  } catch (error) {
    console.error('Error during sign-in:', error);
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || 'Login failed');
    }
    throw new Error('Unable to log in. Please try again later.');
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
    console.log("apiservice", chefData);
      const response = await axios.post(`${BASE_URL}/auth/signUp/chef`,chefData);
      return response.data;
    } catch (error) {
      console.error('Error feching chefs:', error);
      throw error;
    }
};

export const fetchChefRecipes= async (userId)=>{
  try {
    console.log("Fetching chef recipes for user:", userId);
    const response = await axios.get(`${BASE_URL}/recipes/chef/${userId}`
    ,{});
    return response.data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }

}

export const addFavoriteRecipes = async (userID, recipeID) => {
  try {
    console.log(`Adding favorite recipe for user: ${userID}, recipeID: ${recipeID}`);  
    const response = await axios.post(
      `${BASE_URL}/recipes/addFavorite`,
      { userID, recipeID },
      {}
    );
    return response.data.addedRecipe; 
  } catch (error) {
    console.error('Error adding favorite recipes:', error);
    throw error;
  }
};



export const removeFavoriteRecipe = async (userID, recipeID) => {
  try {
    console.log(`removeFavoriteRecipe of user:  ${userID} and recipe id: ${recipeID}`);
    const response = await axios.post(`${BASE_URL}/recipes/removeFavorite`,{userID,recipeID},
    {});
    return response.data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
};


export const addRating = async (userID, recipeID,value ) => {
  try {
    console.log(`add rating from user:  ${userID} to recipe id: ${recipeID} and value ${value}`);
    const rating = await axios.post(`${BASE_URL}/recipes/addRating`,
    {userID,recipeID,value},
    {});
    return rating.data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
};

export const remove = async ( recipeID) => {
  try {
    console.log(`remove recipe id: ${recipeID}`);
    const response = await axios.post(`${BASE_URL}/recipes/remove`,
    {recipeID},
    {});
    return response.data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
};

export const update = async ( recipeID, updatedData) => {
  try {
    console.log(`update recipe id: ${recipeID}`);
    const response = await axios.post(`${BASE_URL}/recipes/update`,
    {recipeID,updatedData},
    {});
    return response.data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
};

export const fetchChefs = async () => {
  try {
    console.log("trying to fetch");
    const response = await axios.get(`${BASE_URL}/chefs`);
    return response.data;
  } catch (error) {
    console.error('Error fetching chefs:', error);
    throw error;
  }
};







