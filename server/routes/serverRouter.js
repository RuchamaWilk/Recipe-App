// server/routes/serverRouter.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const recipesController = require('../controllers/recipesController');
const recipesMiddleware = require('../middlewares/recipesMiddleware');
const {verifyChef} = require('../middlewares/authMiddleware')
const errorMiddleware = require('../middlewares/erroeMiddleware')

router.use('/auth', authController);
router.post('/recipes/add', verifyChef, recipesController); // הוספת מתכון (נגיש רק לשפים)
router.use('/recipes', recipesMiddleware, recipesController);


router.use((req, res, next) => {
    return res.status(404).send('Route Not Found');
});

//router.use(errorMiddleware);

module.exports = router;
