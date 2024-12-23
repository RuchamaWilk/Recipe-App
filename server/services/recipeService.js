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
        if (!recipe) {
            throw new Error(`There is no recipe with this id: ${recipeID}`);
        }
        return Promise.resolve(recipe);
      } catch (err) {
        return Promise.reject(err);
      }
};

const fetchRecipesCategory = async (category) => {
    try {
        const recipes = await Recipe.find({ category: category });
        if (!recipes) {
            throw new Error(`There is no recipes with this category name: ${category}`);
        }
        return Promise.resolve(recipes);
      } catch (err) {
        return Promise.reject(err);
      }
};

const addRecipe= async(recipe)=>{
    try {
        
        const recipes = new Recipe(recipe); 
        await recipes.save();
        return Promise.resolve(recipes);

    } catch (err) {
        return Promise.reject(err);
    }
    
    
}


module.exports = { getRecipes, fetchRecipe,fetchRecipesCategory,addRecipe};
