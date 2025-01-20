const express = require('express');
const router = express.Router();
const { getRecipes ,addRecipe,addRating,AddFavorite,RemoveFavorite,getFavorite} = require('../services/recipesService');
const logger = require('../services/loggerService');
const {verifyChef,verifyUser,} = require('../middlewares/authMiddleware')

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

  
router.get('/favorite/:userID',verifyUser, async (req, res, next) => {
  try {
      const userID = req.params.userID;
      logger.info( `favorite - get favorite recipes from DB, user id: ${userID}`  );
      const Recipes = await getFavorite(userID);
      logger.info(`successfull get recipes of userID: ${userID} `);
      return res.status(200).send(Recipes);
  } catch (err) {
  next(err);
  }
});


router.post('/addFavorite',verifyUser, async (req, res, next) => {
  try {
      const { userID , recipeID} = req.body;
      logger.info(`Calling AddFavorite with userID : ${userID}` );
      const result = await AddFavorite({ userID, recipeID }); 
      logger.info('success with AddFavorite to DB');
      return res.status(200).send({result: result});
  } catch (err) {
      next(err);
  }
});

router.post('/removeFavorite',verifyUser, async (req, res, next) => {
  try {
      const { userID , recipeID} = req.body;
      logger.info(`Calling RemoveFavorite with userID : ${userID} and recipe ${recipeID}` );
      const result = await RemoveFavorite({ userID, recipeID }); 
      logger.info('success with RemoveFavorite from DB');
      return res.status(200).send({result: result});
  } catch (err) {
      next(err);
  }
});
 

  
module.exports = router;