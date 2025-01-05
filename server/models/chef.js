const mongoose = require('mongoose');

const chefSchema = new mongoose.Schema({
    profileImage: { type: String },
    password: { type: String, required: true },
    userName: { type: String, required: true },
    emailAddress: { type: String, required: true, unique: true } 
});

const Chef = mongoose.model('chefs', chefSchema); 

module.exports = Chef;
