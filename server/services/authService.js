// server/services/chefService.js
const Chef = require('../models/chef.js');
const logger = require('./loggerService.js');
const { v4: uuidv4 } = require('uuid');



const getChefs = async () => {
    try {
        logger.info('getChefs- find all chefs')
        const chefs = await Chef.find();
        logger.info('success fetching chefs from DB')
        return Promise.resolve(chefs);
    } catch (err) {
        return Promise.reject(err);
    }
};

const checkForChef = async ({email, password}) => {
    try {
        logger.info(`checkForChef- find chef with email: ${email} and password ${password}`)
        const userOfEmail = await Chef.findOne({ emaiAdress: email });
        if (!userOfEmail) {
            throw new Error(`There is no chef with this email: ${email}`);
        }
        logger.info(`found a chef with the email" ${email}`)
        if (password !== userOfEmail.password) {
            throw new Error(`Incorrect password for user: ${email}`);
        }
        logger.info(`found a chef with email: ${email} and password ${password} `)
        return { success: true, message: 'Login successful' };  // חזרה עם תוצאה
    } catch (err) {
        return Promise.reject(err);
    }
};

const checkChefToAdd = async ({ userName, email, password }) => {
    try {
        logger.info(`checkChefToAdd - check if there's a user with email: ${email}`);
        const userOfEmail = await Chef.findOne({ emailAddress: email });
        if (userOfEmail) {
            throw new Error(`There is a chef with this email: ${email}`);
        }
        logger.info(`no chef with email: ${email}`);
        
        const chef = {
            userName: userName,
            emailAddress: email,
            password: password,
            chefId: uuidv4()
        };
        const newChef = new Chef(chef);
        await newChef.save();
        logger.info(`saved chef ${newChef.userName} in DB`);
        return { success: true, message: 'SignUp successful' };
    } catch (err) {
        logger.error('error adding new chef', err);
        return Promise.reject(err);
    }
};


module.exports = { getChefs, checkForChef,checkChefToAdd };
