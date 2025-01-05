// server/services/chefService.js
const Chef = require('../models/chef.js');
const logger = require('./loggerService.js');



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
        const userOfEmail = await Chef.findOne({ emailAddress: email });
        if (!userOfEmail) {
            throw new Error(`There is no chef with this email: ${email}`);
        }
        logger.info(`found a chef with the email" ${email}`)
        const isMatch = await userOfEmail.checkPassword(password);
        if (!isMatch) {
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
        const chef = {
            userName: userName,
            emailAddress: email,
            password: password,
        };
        const newChef = new Chef(chef);
        await newChef.save(); // This will throw an error if emailAddress is not unique
        logger.info(`Saved chef ${newChef.userName} in DB`);
        return { success: true, message: 'SignUp successful' };
    } catch (err) {
        if (err.code === 11000) {
            logger.error('Duplicate email error:', err);
            return Promise.reject(new Error('Email address must be unique'));
        }
        logger.error('Error adding new chef:', err);
        return Promise.reject(err);
    }
};



module.exports = { getChefs, checkForChef,checkChefToAdd };
