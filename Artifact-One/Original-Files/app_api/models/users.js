const mongoose = require("mongoose");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

//Define the user Schema
const userSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    hash: String,
    salt: String
});

// Hash the new user's passsword and store it with the salt used.
userSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64,
        'sha512').toString('hex');
};

// Method to check if password provided is valid for the current user.
userSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return hash == this.hash;
};

// Create a JWT for a logged in user
userSchema.methods.generateJWT = function() {
    return jwt.sign (
        // JSON payload here
        {
            _id: this._id,
            email: this.email,
            name: this.name
        },
        // Add secret from .env
        process.env.JWT_SECRET,
        // token becomes invalid after 1 hour
        {expiresIn: ('1h')}
    );
};


const User = mongoose.model('users', userSchema);
module.exports = User;