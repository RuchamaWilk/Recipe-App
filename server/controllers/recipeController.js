const express = require('express');
const router = express.Router();
const { getRecipes ,fetchRecipe} = require('../services/recipeService');

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
module.exports = router;