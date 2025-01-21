const express = require('express');
const router = express.Router();
const { getRecipes ,addRecipe,addRating,addFavorite,removeFavorite,removeRecipe,getChefRecipes} = require('../services/recipesService');
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

  


router.get('/chef/:userID',verifyUser, async (req, res, next) => {
  try {
      const userID = req.params.userID;
      logger.info( `favorite - get favorite recipes from DB, user id: ${userID}`  );
      const recipes = await getChefRecipes(userID);
      logger.info(`successfull get recipes of userID: ${userID} `);
      return res.status(200).send(recipes);
  } catch (err) {
  next(err);
  }
});

router.post('/addFavorite', verifyUser, async (req, res, next) => {
  try {
    const { userID, recipeID } = req.body;
    logger.info(`Calling addFavorite with userID: ${userID}`);
    
    const addedRecipe = await addFavorite({ userID, recipeID });
    
    logger.info('Successfully added favorite recipe to DB');
    return res.status(200).send({ addedRecipe });
  } catch (err) {
    next(err);
  }
});



router.post('/removeFavorite',verifyUser, async (req, res, next) => {
  try {
      const { userID , recipeID} = req.body;
      logger.info(`Calling removeFavorite with userID : ${userID} and recipe ${recipeID}` );
      const result = await removeFavorite({ userID, recipeID }); 
      logger.info('success with removeFavorite from DB');
      return res.status(200).send({result: result});
  } catch (err) {
      next(err);
  }
});

router.post('/remove',verifyChef, async (req, res, next) => {
  try {
      const {  recipeID} = req.body;
      logger.info(`Calling Remove of recipe ${recipeID}` );
      const result = await removeRecipe({ recipeID }); 
      logger.info('success with Remove from DB');
      return res.status(200).send({result: result});
  } catch (err) {
      next(err);
  }
});

router.post('/update',verifyChef, async (req, res, next) => {
  try {
      const {  recipeID, updatedData} = req.body;
      logger.info(`Calling updatedData of recipe ${recipeID}` );
      const result = await removeRecipe({ recipeID, updatedData }); 
      logger.info('success with updatedData in DB');
      return res.status(200).send({result: result});
  } catch (err) {
      next(err);
  }
});
 

  
module.exports = router;