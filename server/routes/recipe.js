// server/routes/recipe.js
const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe');


router.get('/', async (req, res) => {
    try {
      console.log("trying to fetch");
      const recipes = await Recipe.find();
      console.log("why?", recipes);
      res.json(recipes);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  router.get('/recipes/:id', async (req, res) => {
    try {
      const recipe = await Recipe.findOne({ recipeId: req.params.id });
      console.log('Fetched recipe:', recipe); 
      if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
      res.json(recipe);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  router.get('/category/:category', async (req, res) => {
    try {
      const recipesByCategory = await Recipe.find({ category: req.params.category }); 
      if (!recipesByCategory) return res.status(404).json({ message: 'Recipe not found' });
      res.json(recipesByCategory);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  /*router.get('/new', function(req, res, next) {
    const recipe = new Recipe();
    res.render('recipe/form', { recipe });
  });*/

  router.post('/recipes', async function(req, res, next) {
    const recipe = new Recipe(req.body);
    try {
        await recipe.save();
    } catch(err) {
        return next(err);
    }
    res.redirect('/recipe/new');
  });
module.exports = router;
