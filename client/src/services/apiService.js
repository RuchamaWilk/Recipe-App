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

export const addRecipe = async (recipeData, token) => {
    try { 
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

export const signIn = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/signIn`, { email, password });
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
      const response = await axios.post(`${BASE_URL}/auth/signUp/chef`,chefData);
      return response.data;
    } catch (error) {
      console.error('Error feching chefs:', error);
      throw error;
    }
};


export const fetchFavoriteRecipes = async (userId,token) => {
  try {
    console.log("Fetching favorite recipes for user:", userId);
    const response = await axios.get(`${BASE_URL}/recipes/favorite/${userId}`,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
};

export const fetchChefRecipes= async (userId,token)=>{
  try {
    console.log("Fetching chef recipes for user:", userId);
    const response = await axios.get(`${BASE_URL}/recipes/chef/${userId}`,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }

}

export const addFavoriteRecipes = async (userID, recipeID, token) => {
  try {
    console.log(`Adding favorite recipe for user: ${userID}, recipeID: ${recipeID}`);
    
    const response = await axios.post(
      `${BASE_URL}/recipes/addFavorite`,
      { userID, recipeID },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.addedRecipe; 
  } catch (error) {
    console.error('Error adding favorite recipes:', error);
    throw error;
  }
};



export const removeFavoriteRecipe = async (userID, recipeID,token) => {
  try {
    console.log(`removeFavoriteRecipe of user:  ${userID} and recipe id: ${recipeID}`);
    const response = await axios.post(`${BASE_URL}/recipes/removeFavorite`,{userID,recipeID},{
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
};


export const addRating = async (userID, recipeID,value, token ) => {
  try {
    console.log(`add rating from user:  ${userID} to recipe id: ${recipeID} and value ${value}`);
    const rating = await axios.post(`${BASE_URL}/recipes/addRating`,{userID,recipeID,value},{
      headers: {
        Authorization: `Bearer ${token}`
      }});
    return rating.data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
};

export const remove = async ( recipeID,token) => {
  try {
    console.log(`remove recipe id: ${recipeID}`);
    const response = await axios.post(`${BASE_URL}/recipes/remove`,{recipeID},{
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
};

export const update = async ( recipeID, updatedData,token) => {
  try {
    console.log(`remove recipe id: ${recipeID}`);
    const response = await axios.post(`${BASE_URL}/recipes/update`,{recipeID,updatedData},{
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
};







