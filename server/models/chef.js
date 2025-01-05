const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const chefSchema = new mongoose.Schema({
    profileImage: { type: String },
    password: { type: String, required: true },
    userName: { type: String, required: true },
    emailAddress: { type: String, required: true, unique: true } 
});

chefSchema.pre('save', function(next) {
    var user = this;

    if (!user.isModified('password')) return next();

    bcrypt.hash(user.password, saltRounds, function (err, hash) {
        if (err) { return next(err); }
        user.password = hash;
        next();
    });
});

chefSchema.methods.checkPassword = function(candidatePassword) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
            if (err) return reject(err);
            resolve(isMatch);
        });
    })
};


const Chef = mongoose.model('chefs', chefSchema); 

module.exports = Chef;
