const express = require('express');
const router = express.Router();
const {getChefs} =require('../services/chefsService');
const logger = require('../services/loggerService');

router.get('/', async (req, res, next) => {
    try {
        logger.info('calling getChefs');
        const recipeObject = await getChefs();
        logger.info('success with getChefs');
        return res.status(200).send(recipeObject);
      }
    catch (err) {
      next(err);
    }
  });

module.exports = router;