// server/services/authService.js
const User = require('../models/user.js');
const Recipe = require('../models/recipe.js')
const logger = require('./loggerService.js');
const {generateToken}  = require('../utils/jwt.js');

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

const signIn = async ({ email, password }) => {
    try {
        logger.info(`signIn - find user with email: ${email} and password`);

        // חיפוש המשתמש לפי אימייל
        const userOfEmail = await User.findOne({ emailAddress: email });
        if (!userOfEmail) {
            throw new Error('One or more of the entered details is incorrect'); // הודעה כללית
        }
        logger.info(`found a chef with the email: ${email}`);

        const isMatch = await userOfEmail.checkPassword(password);
        if (!isMatch) {
            throw new Error('One or more of the entered details is incorrect.'); // הודעה כללית
        }
        logger.info(`found a chef with email: ${email} and password`);

        // יצירת טוקן
        const token = generateToken(userOfEmail._id, userOfEmail.emailAddress, userOfEmail.type);
        logger.info(`token: ${token}`);

        // אם המשתמש הוא שף, חפש את המתכונים שלו
        let chefRecipes = [];
        if (userOfEmail.type === "chef") {
            chefRecipes = await Recipe.find({ chefId: userOfEmail._id })
                .populate({ path: 'chefId', select: 'userName' }) // הוספת userName ב-chefId
                .lean();
        }
        logger.info(`chefRecipes: ${chefRecipes}`);

        // חיפוש מתכונים אהובים
        const favoriteRecipes = await Recipe.find({ _id: { $in: userOfEmail.favoriteRecipes } })
            .populate({ path: 'chefId', select: 'userName' }) // הוספת userName ב-chefId
            .lean();

        // החזרת נתוני המשתמש
        const user = {
            success: true,
            token: token,
            user: {
                _doc: userOfEmail.toObject(), // נתוני המשתמש המקוריים
                chefRecipes,                 // מתכונים של השף
                favoriteRecipes,             // מתכונים אהובים
            },
        };
        console.log(user);
        return user;

    } catch (err) {
        logger.error(`Sign in failed: ${err.message}`);
        return { success: false, message: err.message };
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
        logger.info(`Saved user ${newUser.userName} in DB`);
        return { success: true };
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
        logger.info(`Saved user ${newChef.userName} in DB`);
        return {success: true}  ;
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

