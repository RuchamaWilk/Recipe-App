const Recipe = require('../models/recipe.js');
const logger = require('./loggerService.js');
const User = require('../models/user.js');
const mongoose = require('mongoose');



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
    
    const addFavorite = async ({ userID, recipeID }) => {
      try {
        logger.info(`AddFavorite - adding a favorite recipe to DB for user: ${userID}`);
        const user = await User.findByIdAndUpdate(
          userID,
          { $addToSet: { favoriteRecipes: recipeID } }, // הוספה אם אינו קיים
          { new: true } // מחזיר את המסמך המעודכן
        );
        if (!user) {
          throw new Error('User not found');
        }
        const addedRecipe = await Recipe.findById(recipeID);
        if (!addedRecipe) {
          throw new Error('Recipe not found');
        }
        logger.info(`Added recipe: ${recipeID} to user ${userID}`);
        return addedRecipe; // מחזיר את פרטי המתכון שנוסף
      } catch (err) {
        logger.error(`Failed to add favorite recipe: ${recipeID} for user: ${userID}. Error: ${err.message}`);
        throw err;
      }
    };
    
    

const removeFavorite = async ({ userID, recipeID }) => {
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
        logger.info(`getFavorite - find recipes of userID: ${userID}`)
        
        // חיפוש כל המתכונים שמועדפים ע"י userID עם מידע על השם של הכותב
        const user = await User.findById(userID).populate({
          path: 'favoriteRecipes',
          populate: {
            path: 'chefId',
            select: 'userName' // בוחר את השדה 'userName' ממודל 'chefId'
          }
        }).lean();
        
        if (!user) {
            throw new Error(`There is no User with ID: ${userID}`);
        }
        
        logger.info(`found user with ID: ${userID}`)
        return Promise.resolve(user.favoriteRecipes);
    } catch (err) {
        logger.error(`Error fetching favorite recipes for user ID: ${userID}. Error: ${err.message}`);
        return Promise.reject(err);
    }
};


const getChefRecipes = async (userID) => {
  try {
    logger.info(`getChefRecipes - finding recipes for chef ID: ${userID}`);
    
    // חיפוש כל המתכונים ששייכים ל- chefId המסוים עם מידע על השם
    const recipes = await Recipe.find({ chefId: new mongoose.Types.ObjectId(userID) }).populate({
      path: 'chefId',
      select: 'userName' // בוחר את השדה 'userName' ממודל 'chefId'
    }).lean();
    
    logger.info(`Query result: ${JSON.stringify(recipes, null, 2)}`);
    if (recipes.length === 0) {
      logger.info(`No recipes found for chef ID: ${userID}`);
      return Promise.resolve([]);
    }
    
    logger.info(`Found ${recipes.length} recipes for chef ID: ${userID}`);
    return Promise.resolve(recipes);
  } catch (err) {
    logger.error(`Error fetching recipes for chef ID: ${userID}. Error: ${err.message}`);
    return Promise.reject(err);
  }
};





const removeRecipe = async (recipeID) => {
  try {
    logger.info(`Removing recipe with ID: ${recipeID} from the database`);
    const result = await Recipe.findByIdAndDelete(recipeID);
    if (!result) {
      throw new Error(`Recipe with ID ${recipeID} not found`);
    }

    logger.info(`Successfully removed recipe with ID: ${recipeID}`);
    return result; // המסמך שנמחק מוחזר כתוצאה
  } catch (err) {
    logger.error(`Failed to remove recipe with ID: ${recipeID}. Error: ${err.message}`);
    throw err;
  }
};

const updateRecipe = async (recipeID, updatedData) => {
  try {
    logger.info(`Updating recipe with ID: ${recipeID}`);

    // עדכון הנתונים של המתכון
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      recipeID,               // ה-ID של המתכון לעדכון
      { $set: updatedData },  // הנתונים המעודכנים
      { new: true, runValidators: true } // החזרת המסמך המעודכן ואימות הנתונים
    );

    if (!updatedRecipe) {
      throw new Error(`Recipe with ID ${recipeID} not found`);
    }

    logger.info(`Successfully updated recipe with ID: ${recipeID}`);
    return updatedRecipe;
  } catch (err) {
    logger.error(`Failed to update recipe with ID: ${recipeID}. Error: ${err.message}`);
    throw err;
  }
};










module.exports = { getRecipes,addRecipe,addRating,addFavorite,removeFavorite,getFavorite,removeRecipe,updateRecipe,getChefRecipes};
