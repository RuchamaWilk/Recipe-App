const mongoose = require('mongoose');



const chefSchema = new mongoose.Schema({
    chefName: { type: String, required: true},
    chefId: {type: String,required: true},
    profileImage: {  type: String,required: true },
    password: {  type: String,required: true },
    userName:{type:String, required:true},
    emaiAdress: {}

});

const Chef = mongoose.model('chefs', chefSchema); 

module.exports = Chef;