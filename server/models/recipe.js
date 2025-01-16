//server/models/recipe.js
const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
  name: String,
  amount: String,
  
});

const instructionsSchema = new mongoose.Schema({
  name: String,
});

const ratingSchema = new mongoose.Schema({
  rating: { type: Number, required: true },     
  reviewers: [String]
});

const recipeSchema = new mongoose.Schema({
    name: { type: String, required: true},
    avgTime: {type: Number, required: true},
    chefId: {type: String,required: true},
    image: {  type: String,required: true },
    ingredients: [ingredientSchema],
    instructions: [instructionsSchema],
    category: {type: String,required: true},
    ratings: ratingSchema 
  });


const Recipe = mongoose.model('recipes', recipeSchema); 

module.exports = Recipe;
