const express = require('express');
const router = express.Router();
const { getRecipes } = require('../services/recipeService');

router.get('/', async (req, res, next) => {
    try {
      console.log("trying to fetch");
      const recipes = await getRecipes();
      return res.status(200).send(recipes);
    } catch (err) {
      next(err)
    }
  });
module.exports = router;