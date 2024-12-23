const express = require('express');
const router = express.Router();
const { getRecipes ,fetchRecipe,fetchRecipesCategory,addRecipe} = require('../services/recipeService');

router.get('/', async (req, res, next) => {
    try {
      const recipes = await getRecipes();
      return res.status(200).send(recipes);
    } catch (err) {
      next(err)
    }
  });

  router.get('/recipes/:id', async (req, res, next) => {
    try {
        const recipeID= req.params.id;
        const result = await fetchRecipe(recipeID);
        return res.status(200).send(result);
    } catch (err) {
        next(err);  // טיפול בשגיאות
    }
});

router.get('/category/:category', async (req, res) => {
    try {
        const category= req.params.category
        const allRecipesFromCategory =await fetchRecipesCategory(category);
        return res.status(200).send(allRecipesFromCategory);
    } catch (err) {
        next(err);
    }
  });


  router.post('/add-recipes', async (req, res, next) => {
    try {
        const recipe = req.body;
        const newRecipe= await addRecipe(recipe);
    return res.status(200).send(newRecipe);
    } catch (err) {
    next(err);
    }
  });
module.exports = router;