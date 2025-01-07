const express = require('express');
const router = express.Router();
const { getRecipes ,fetchRecipe,fetchRecipesCategory,addRecipe} = require('../services/recipesService');
const logger = require('../services/loggerService');


router.get('/:id?', async (req, res, next) => {
  try {
    const recipeID = req.params.id;
    
    if (recipeID) {
      logger.info(`fetchRecipe - calling recipe with ID: ${recipeID}`);
      const result = await fetchRecipe(recipeID);
      logger.info(`success with fetchRecipe id: ${recipeID}`);
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
module.exports = router;