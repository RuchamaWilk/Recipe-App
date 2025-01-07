const Recipe = require('../models/recipe.js');
const logger = require('./loggerService.js');


const getRecipes = async () => {
    try {
        logger.info('getChefs- find all recipe')
        const recipes = await Recipe.find();
        logger.info('success fetching recipes from DB')
        return Promise.resolve(recipes);
    } catch (err) {
        logger.error(err);
        return Promise.reject(err);
    }
};

const fetchRecipe = async (recipeID) => {
    try {
        logger.info(`fetchRecipe- find recipe with recipeID: ${recipeID}`)
        const recipe = await Recipe.findOne({ _id: recipeID });
        if (!recipe) {
            throw new Error(`There is no recipe with this id: ${recipeID}`);
        }
        logger.info(`found a recipe with recipeID: ${recipeID}`)
        return Promise.resolve(recipe);
      } catch (err) {
        logger.error(err)
        return Promise.reject(err);
      }
};

const fetchRecipesCategory = async (category) => {
    try {
        logger.info(`fetchRecipesCategory- find recipes of category: ${category}`)
        const recipes = await Recipe.find({ category: category });
        if (!recipes) {
            throw new Error(`There is no recipes with this category name: ${category}`);
        }
        logger.info(`found recipes of category: ${category}`)
        return Promise.resolve(recipes);
      } catch (err) {
        logger.error(err)
        return Promise.reject(err);
      }
};

const addRecipe= async(recipe)=>{
    try {
        logger.info(`addRecipe- recipe name: ${recipe.name}`)
        logger.info(`chef id: ${recipe.chefId}`)
        const recipes = new Recipe(recipe); 
        await recipes.save();
        logger.info(`save recipe ${recipe.name} in DB  `)
        return Promise.resolve(recipes);
    } catch (err) {
        logger.error(err)
        return Promise.reject(err);
    }
    
    
}


module.exports = { getRecipes, fetchRecipe,fetchRecipesCategory,addRecipe};
