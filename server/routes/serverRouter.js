// server/routes/serverRouter.js
const express = require('express');
const router = express.Router();
const chefController = require('../controllers/chefController');
const chefMiddleware = require('../middlewares/chefMiddleware');
const recipeController = require('../controllers/recipeController');
const recipeMiddleware = require('../middlewares/recipeMiddleware');


router.use('/chef', chefMiddleware, chefController);
router.use('/', recipeMiddleware, recipeController);

router.use((req, res, next) => {
    return res.status(404).send('Route Not Found');
});

module.exports = router;
