const Recipe = require('../models/recipe.js');
const logger = require('./loggerService.js');
const User = require('../models/user.js');


const getChefs = async () => {
    try {
        logger.info("Find all users with type 'chef'");
        const chefs = await User.find({ type: 'chef' })
          .select('-password') // Don't send password
          //.sort({ joinDate: -1 }); // Sort by newest first
        logger.info(chefs);
        return chefs;
      } catch (err) {
        console.error(err.message);
        throw err;
      }
  };

module.exports = {getChefs };
