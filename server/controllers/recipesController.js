const express = require('express');
const router = express.Router();
const { getRecipes ,getRecipe,fetchRecipesCategory,addRecipe,addRating,check,getRating} = require('../services/recipesService');
const logger = require('../services/loggerService');

router.get('/checkIfRated', async (req, res, next) => {
  try {
      const {userID, recipeID} = req.query;
      logger.info( `checkIfRated -  ${recipeID} and user: ${userID}`  );
      const recipeRaited= await check({userID, recipeID});
      logger.info(`successfull check recipe rated : ${recipeRaited} `);
      return res.status(200).send(recipeRaited);
  } catch (err) {
  next(err);
  }
});

router.get('/:id?', async (req, res, next) => {
  try {
    const recipeID = req.params.id;
    if (recipeID) {
      logger.info(`getRecipe - calling recipe with ID: ${recipeID}`);
      const result = await getRecipe(recipeID);
      logger.info(`success with getRecipe id: ${recipeID}`);
      return res.status(200).send(result);
    } else {
      logger.info('calling getRecipes');
      const recipes = await getRecipes();
      logger.info('success with getRecipes');
      return res.status(200).send(recipes);
    }
  } catch (err) {
    next(err);
  }
});


router.get('/category/:categoryId', async (req, res) => {
    try {
        const category= req.params.categoryId
        logger.info( `fetchRecipesCategory - calling recipes of ${category} category`  );
        const allRecipesFromCategory =await fetchRecipesCategory(category);
        logger.info(`success with fetchRecipesCategory category: ${category}`);
        return res.status(200).send(allRecipesFromCategory);
    } catch (err) {
        next(err);
    }
  });


  router.post('/add', async (req, res, next) => {
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

  router.post('/addRating', async (req, res, next) => {
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

  router.get('/fetchRating/:recipeID', async (req, res) => {
    try {
        const recipeid= req.params.recipeID;
        logger.info( `getRating - calling rating of recipe ${recipeid}`  );
        const { count, value } = await getRating(recipeid);
        logger.info(`success with getRating category: ${recipeid}`);
        return res.status(200).send({ count, value });
    } catch (err) {
      logger.error("hello ",err)
        next(err);
    }
  });
 

  
module.exports = router;