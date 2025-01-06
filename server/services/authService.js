// server/services/authService.js
const User = require('../models/user.js');
const logger = require('./loggerService.js');
const { generateToken, verifyJwt } = require('../utils/jwt.js');


const getUsers = async () => {
    try {
        logger.info('getChefs- find all chefs')
        const chefs = await User.find();
        logger.info('success fetching chefs from DB')
        return Promise.resolve(chefs);
    } catch (err) {
        return Promise.reject(err);
    }
};

const signIn = async ({email, password}) => {
    try {
        logger.info(`signIn- find chef with email: ${email} and password ${password}`)
        const userOfEmail = await User.findOne({ emailAddress: email });
        if (!userOfEmail) {
            throw new Error(`There is no chef with this email: ${email}`);
        }
        logger.info(`found a chef with the email" ${email}`)
        const isMatch = await userOfEmail.checkPassword(password);
        if (!isMatch) {
            throw new Error(`Incorrect password for user: ${email}`);
        }
        logger.info(`found a chef with email: ${email} and password ${password} `)
        const token = generateToken(userOfEmail._id,userOfEmail.email);
        return {success: true,token };  // חזרה עם תוצאה
    } catch (err) {
        return Promise.reject(err);
    }
};


const AddUser = async ({ userName, email, password }) => {
    try {
        logger.info(`AddUser.  ${userName} to DB`);
        const user = {
            userName: userName,
            emailAddress: email,
            password: password,
            type: "user"
        };
        const newUser = new User(user);
        await newUser.save(); // This will throw an error if emailAddress is not unique
        const token = generateToken(newUser._id,newUser.email);
        logger.info(`Saved user ${newUser.userName} in DB`);
        return { success: true,token };
    } catch (err) {
        if (err.code === 11000 && err.keyValue.emailAddress) {
            logger.error('Duplicate email error:', err);
            return Promise.reject(new Error('Email address must be unique'));
        }
        logger.error('Error adding new User:', err);
        return Promise.reject(err);
    }
};

const AddChef = async ({ userName, email, password, yearsOfExperience,phoneNumber,aboutMe }) => {
    try {
        logger.info(`AddChef.  ${email} to DB`);
        const chef = {
            userName: userName,
            emailAddress: email,
            password: password,
            yearsOfExperience: yearsOfExperience,
            phoneNumber: phoneNumber,
            aboutMe: aboutMe,
            type: "chef"
        };
        const newChef = new User(chef);
        logger.info(`new chef saved in db`);
        await newChef.save(); // This will throw an error if emailAddress is not unique
        const token = generateToken(newChef._id,newChef.email);
        logger.info(`Saved user ${newChef.userName} in DB`);
        return { success: true,token };
    } catch (err) {
        if (err.code === 11000 && err.keyValue.emailAddress) {
            logger.error('Duplicate email error:', err);
            return Promise.reject(new Error('Email address must be unique'));
        }
        logger.error('Error adding new Chef:', err);
        return Promise.reject(err);
    }
};






module.exports = { getUsers, signIn,AddUser, AddChef };
