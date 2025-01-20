// server/services/authService.js
const User = require('../models/user.js');
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

const signIn = async ({email, password}) => {
    try {
        logger.info(`signIn- find chef with email: ${email} and password ${password}`)
        const userOfEmail = await User.findOne({ emailAddress: email });
        if (!userOfEmail) {
            throw new Error('One or more of the entered details is incorrect'); // הודעה כללית
        }
        logger.info(`found a chef with the email" ${email}`)
        const isMatch = await userOfEmail.checkPassword(password);
        if (!isMatch) {
            throw new Error('One or more of the entered details is incorrect'); // הודעה כללית
        }
        logger.info(`found a chef with email: ${email} and password ${password} `)
        logger.info(`id: ${userOfEmail._id} email: ${userOfEmail.emailAddress} type: ${userOfEmail.type}`)
        const token = generateToken(userOfEmail._id,userOfEmail.emailAddress, userOfEmail.type);
        
        return {success: true,token: token , user: userOfEmail };  // חזרה עם תוצאה
    } catch (err) {
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

const AddFavorite =async ({userID, recipeID}) => {
    try {
        logger.info(`AddFavorite- add a favorite recipe to DB for user: ${userID}`)
        const result = await User.findByIdAndUpdate(
            userID,
            { $addToSet: { favoriteRecipes: recipeID } }, // הוספה אם אינו קיים
            { new: true } // מחזיר את המסמך המעודכן
          );
          if(!result){
            throw new Error('User not found');
          }
        logger.info(`add recipe: ${recipeID} to user ${userID}`)
        return result.favoriteRecipes;
      } catch (err) {
        logger.error(`Failed to add favorite recipe: ${recipeID} for user: ${userID}. Error: ${err.message}`)
        throw err;
      }

}

const RemoveFavorite = async ({ userID, recipeID }) => {
    try {
      logger.info(`RemoveFavorite - removing a favorite recipe from DB for user: ${userID}`);
      
      const result = await User.findByIdAndUpdate(
        userID,
        { $pull: { favoriteRecipes: recipeID } }, // $pull משמש להסרת ערך ממערך
        { new: true } // מחזיר את המסמך המעודכן
      );
      
      if (!result) {
        throw new Error('User not found');
      }
      
      logger.info(`Successfully removed recipe: ${recipeID} for user: ${userID}`);
      return result.favoriteRecipes;
    } catch (err) {
      logger.error(`Failed to remove favorite recipe: ${recipeID} for user: ${userID}. Error: ${err.message}`);
      throw err;
    }
  };

  





module.exports = { getUsers, signIn,AddUser, AddChef,AddFavorite,RemoveFavorite };
