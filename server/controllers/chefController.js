// server/controllers/chefController.js
const express = require('express');
const router = express.Router();
const logger = require('../services/loggerService');
const { getChefs, checkForChef } = require('../services/chefService');

router.get('/', async (req, res, next) => {
    try {
        logger.info('callibg getChefs');
        const chefs = await getChefs();
        logger.info('success with getChefs');
        return res.status(200).send(chefs);
    } catch (err) {
        next(err); 
    }
});

router.post('/login', async (req, res, next) => {

    try {
        const { email, password } = req.body;
        logger.info(`Calling checkForChef with email: ${email} and password: ${password}`);
        const result = await checkForChef({ email, password }); 
        logger.info('success with checkForChef');
        return res.status(200).send(result);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
