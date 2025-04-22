// server/routes/serverRouter.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const recipesController = require('../controllers/recipesController');
const recipesMiddleware = require('../middlewares/recipesMiddleware');
const errorMiddleware = require('../middlewares/erroeMiddleware');
const chefsController = require('../controllers/chefsController');

router.use('/auth', authController);
router.use('/recipes', recipesController);
router.use('/chefs', chefsController);



router.use((req, res, next) => {
    return res.status(404).send('Route Not Found');
});

//router.use(errorMiddleware);

module.exports = router;
