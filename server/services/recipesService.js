const Recipe = require('../models/recipe.js');
const logger = require('./loggerService.js');
const User = require('../models/user.js');


const getRecipes = async () => {
  try {
      logger.info('getRecipes - find all recipes');
      const recipes = await Recipe.find().populate({
              path: 'chefId',
              select: 'userName' 
          })
          .lean();  
      logger.info('success fetching recipes with chef names from DB');
      return recipes
  } catch (err) {
      logger.error('Error fetching recipes:', err);
      throw err;
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
    
const AddFavorite =async ({userID, recipeID}) => {
    try {
        logger.info(`AddFavorite- add a favorite recipe to DB for user: ${userID}`)
        const result = await User.findByIdAndUpdate(
            userID,
            { $addToSet: { favoriteRecipes: recipeID } }, // הוספה אם אינו קיים
            { new: true } // מחזיר את המסמך המעודכן
          );
          if(!result){
            throw new Error('User not found');
          }
        logger.info(`add recipe: ${recipeID} to user ${userID}`)
        return result.favoriteRecipes;
      } catch (err) {
        logger.error(`Failed to add favorite recipe: ${recipeID} for user: ${userID}. Error: ${err.message}`)
        throw err;
      }

}

const RemoveFavorite = async ({ userID, recipeID }) => {
    try {
      logger.info(`RemoveFavorite - removing a favorite recipe from DB for user: ${userID}`);
      
      const result = await User.findByIdAndUpdate(
        userID,
        { $pull: { favoriteRecipes: recipeID } }, // $pull משמש להסרת ערך ממערך
        { new: true } // מחזיר את המסמך המעודכן
      );
      
      if (!result) {
        throw new Error('User not found');
      }
      
      logger.info(`Successfully removed recipe: ${recipeID} for user: ${userID}`);
      return result.favoriteRecipes;
    } catch (err) {
      logger.error(`Failed to remove favorite recipe: ${recipeID} for user: ${userID}. Error: ${err.message}`);
      throw err;
    }
  };

  
const getFavorite = async (userID) => {
    try {
        logger.info(`getFavorite- find recipes of userID: ${userID}`)
        const user = await User.findById(userID).populate('favoriteRecipes');
        if (!user) {
            throw new Error(`There is no User with ID: ${userID}`);
        }
        logger.info(`found user with ID: ${userID}`)
        return Promise.resolve(user.favoriteRecipes);
      } catch (err) {
        logger.error(`this is a err: ${err} `)
        return Promise.reject(err);
      }
};






module.exports = { getRecipes,addRecipe,addRating,AddFavorite,RemoveFavorite,getFavorite};
