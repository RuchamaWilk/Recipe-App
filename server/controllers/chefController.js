// server/controllers/chefController.js
const express = require('express');
const router = express.Router();

const { getChefs, checkForChef } = require('../services/chefService');

router.get('/', async (req, res, next) => {
    try {
        const chefs = await getChefs();
        return res.status(200).send(chefs);
    } catch (err) {
        next(err);  // טיפול בשגיאות
    }
});

router.post('/login', async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const result = await checkForChef({ email, password }); // חזור עם תוצאה ולא json ישירות
        return res.status(200).send(result);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
