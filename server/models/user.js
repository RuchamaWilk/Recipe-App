const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = new mongoose.Schema({
    profileImage: { type: String },
    password: { type: String, required: true },
    userName: { type: String, required: true },
    emailAddress: { type: String, required: true, unique: true } ,
    joinDate: { type: Date, required: true,default: Date.now}, 
    type: { type: String, enum: ['chef', 'user'], required: true }, 
    yearsOfExperience: { type: Number, required: function () { return this.type === 'chef'; } },
    phoneNumber: { type: String, required: function () { return this.type === 'chef'; } },
    aboutMe: {type: String ,required: function () { return this.type === 'chef';}}
});

userSchema.pre('save', function(next) {
    var user = this;

    if (!user.isModified('password')) return next();

    bcrypt.hash(user.password, saltRounds, function (err, hash) {
        if (err) { return next(err); }
        user.password = hash;
        next();
    });
});

userSchema.methods.checkPassword = function(candidatePassword) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
            if (err) return reject(err);
            resolve(isMatch);
        });
    })
};


const User = mongoose.model('users', userSchema); 

module.exports = User;
