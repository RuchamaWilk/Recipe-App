const Recipe = require('../models/recipe.js');

const getRecipes = async () => {
    try {
        const recipes = await Recipe.find();
        return Promise.resolve(recipes);
    } catch (err) {
        return Promise.reject(err);
    }
};

const fetchRecipe = async (recipeID) => {
    try {
        const recipe = await Recipe.findOne({ recipeId: recipeID });
        console.log('Fetched recipe:', recipe); 
        if (!recipe) {
            throw new Error(`There is no recipe with this id: ${recipeID}`);
        }
        return Promise.resolve(recipe);
      } catch (err) {
        return Promise.reject(err);
      }
};
module.exports = { getRecipes, fetchRecipe};
