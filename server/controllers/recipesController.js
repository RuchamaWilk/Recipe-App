const express = require('express');
const router = express.Router();
const { getRecipes ,addRecipe,addRating} = require('../services/recipesService');
const logger = require('../services/loggerService');
const {verifyChef,verifyUser} = require('../middlewares/authMiddleware')

router.get('/', async (req, res, next) => {
  try {
      logger.info('calling getRecipes');
      const recipeObject = await getRecipes();
      logger.info('success with getRecipes');
      return res.status(200).send(recipeObject);
    }
  catch (err) {
    next(err);
  }
});


  router.post('/add',verifyChef, async (req, res, next) => {
    try {
        const recipe = req.body;
        recipe.chefId = req.user._id;

        logger.info( `addRecipe - set new recipe to DB, recipe Name: ${recipe.chefId}`  );
        const newRecipe= await addRecipe(recipe);
        logger.info(`successfull post recipe: ${newRecipe._id} `);
        return res.status(200).send(newRecipe);
    } catch (err) {
    next(err);
    }
  });

  router.post('/addRating',verifyUser, async (req, res, next) => {
    try {
        const {userID, recipeID,value} = req.body;
        logger.info( `addRating -  new rating fo recipe: ${recipeID} and value: ${value}`  );
        const recipeRaited= await addRating({userID, recipeID,value});
        logger.info(`successfull post recipe rating for: ${recipeID} `);
        return res.status(200).send(recipeRaited);
    } catch (err) {
    next(err);
    }
  });
 

  
module.exports = router;