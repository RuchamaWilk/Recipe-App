const Recipe = require('../models/recipe.js');

const getRecipes = async () => {
    try {
        const recipes = await Recipe.find();
        return Promise.resolve(recipes);
    } catch (err) {
        return Promise.reject(err);
    }
};
module.exports = { getRecipes};
