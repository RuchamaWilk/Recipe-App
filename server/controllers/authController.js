// server/controllers/chefController.js
const express = require('express');
const router = express.Router();
const logger = require('../services/loggerService');
const { getUsers, signIn ,AddUser,AddChef} = require('../services/authService');

router.get('/', async (req, res, next) => {
    try {
        logger.info('callibg getChefs');
        const chefs = await getUsers();
        logger.info('success with getChefs');
        return res.status(200).send(chefs);
    } catch (err) {
        next(err); 
    }
});

router.post('/signIn', async (req, res, next) => {

    try {
        const { email, password } = req.body;
        logger.info(`Calling signIn with email: ${email} and password: ${password}`);
        const {  token,user } = await signIn({ email, password });        
        return res.status(200).send({ token , user});
        
    } catch (err) {
        next(err);
    }
});


router.post('/signUp', async (req, res, next) => {
    
    try {
        const { userName, email, password } = req.body;
        logger.info(`Calling AddUser with user name: ${userName} email: ${email} and password: ${password}`);
        const result = await AddUser({ userName,email, password }); 
        logger.info('success with signUp');
        return res.status(200).send({result: result});
    } catch (err) {
        next(err);
    }
});

router.post('/signUp/chef', async (req, res, next) => {

    try {
        const { userName, email, password, yearsOfExperience,phoneNumber,aboutMe } = req.body;
        logger.info(`Calling AddChef with user name: ${userName} email: ${email} and password: ${password}`);
        const result = await AddChef({ userName, email, password, yearsOfExperience,phoneNumber,aboutMe }); 
        logger.info('success with signUp as Chef');
        return res.status(200).send({result: result});
    } catch (err) {
        next(err);
    }
});


  


module.exports = router;
