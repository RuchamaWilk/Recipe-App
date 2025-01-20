const express = require('express');
const router = express.Router();
const { getRecipes ,fetchRecipesCategory,addRecipe,addRating} = require('../services/recipesService');
const logger = require('../services/loggerService');

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
 

  
module.exports = router;