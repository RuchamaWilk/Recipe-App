// server/services/chefService.js
const Chef = require('../models/chef.js');

const getChefs = async () => {
    try {
        const chefs = await Chef.find();
        return Promise.resolve(chefs);
    } catch (err) {
        return Promise.reject(err);
    }
};

const checkForChef = async ({email, password}) => {
    try {
        const userOfEmail = await Chef.findOne({ emaiAdress: email });
        if (!userOfEmail) {
            throw new Error(`There is no chef with this email: ${email}`);
        }
        if (password !== userOfEmail.password) {
            throw new Error(`Incorrect password for user: ${email}`);
        }
        return { success: true, message: 'Login successful' };  // חזרה עם תוצאה
    } catch (err) {
        return Promise.reject(err);
    }
};

module.exports = { getChefs, checkForChef };
