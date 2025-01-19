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

const getRecipe = async (recipeID) => {
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

const addRating= async({userID, recipeID,value})=>{
    try {
        logger.info(`${recipeID} by user: ${userID} and rate: ${value}`);
        const recipe = await Recipe.findById(recipeID);
        if (!recipe) {
            throw new Error(`Recipe with ID ${recipeID} not found.`);
        }
        if (!recipe.ratings) {
            recipe.ratings = { rating: 0, reviewers: [] };
        }
        if (recipe.ratings.reviewers.includes(userID)) {
            throw new Error(`User ${userID} has already rated this recipe.`);
        }
        recipe.ratings.rating += value;
        logger.info(`reviewers are ${recipe.ratings.reviewers}`);

        recipe.ratings.reviewers.push(userID);
        await recipe.save();
        logger.info(`Successfully added rating to recipe ID: ${recipeID} by user: ${userID}`);
        return recipe;
      } catch (err) {
        logger.error(`Error in addRating: ${err.message}`);
        throw err;
      }
    };
    
    const check= async({userID, recipeID})=>{
        try {
            logger.info(`check- user : ${userID}`)
            const recipe = await Recipe.findById(recipeID);
            if (!recipe) {
                throw new Error(`Recipe with ID ${recipeID} not found.`);
            }
            if (!recipe.ratings) {
                recipe.ratings = { rating: 0, reviewers: [] };
            }
            const hasRatedAlready = recipe.ratings.reviewers.includes(userID);

            logger.info(`check- user : ${hasRatedAlready}`)
            return hasRatedAlready
        } catch (err) {
            logger.error(err)
            return Promise.reject(err);
        }  
    }

    const getRating= async(recipeID)=>{
        try{
            const recipe = await Recipe.findById(recipeID);
            if (!recipe) {
                throw new Error(`Recipe with ID ${recipeID} not found.`);
            }
            if (!recipe.ratings) {
                recipe.ratings = { rating: 0, reviewers: [] };
            }
            const count = recipe.ratings.reviewers.length; 
            const rating = recipe.ratings.rating;  
            const value= count > 0 ? rating / count : 0;   

        return { count, value }; 

        }
        catch(err){
            logger.error("hi", err)
            return Promise.reject(err);
        }
    }



module.exports = { getRecipes, getRecipe,fetchRecipesCategory,addRecipe,addRating,check,getRating};
