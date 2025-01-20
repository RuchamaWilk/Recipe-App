const Recipe = require('../models/recipe.js');
const logger = require('./loggerService.js');
const User = require('../models/user.js');


const getRecipes = async () => {
    try {
        logger.info('getRecipes - find all recipes');
        
        // Fetch all recipes
        const recipes = await Recipe.find();

        // Map through recipes and fetch chef names
        const recipeObject = await Promise.all(
            recipes.map(async (recipe) => {
                const chef = await User.findById({ _id: recipe.chefId }); // Assuming 'User' is the schema for chefs
                return {
                    recipe,
                    chefName: chef ? chef.userName : null, // Add chef name, or null if not found
                };
            })
        );
        
        logger.info(`success fetching recipes with chef names from DB ${recipeObject}`);
        return Promise.resolve(recipeObject);
    } catch (err) {
        logger.error(err);
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



module.exports = { getRecipes,fetchRecipesCategory,addRecipe,addRating};
