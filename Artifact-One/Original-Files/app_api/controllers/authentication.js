const mongoose = require('mongoose');
const User = require('../models/users');
const passport = require('passport');

const register = async(req, res) => {

    // Make sure all parameters are provided
    if (!req.body.name || !req.body.email || !req.body.password) {
        return res.status(400).json({"message": "All fields are required for registration"});
    }

    // Create new user for database.
    const user = new  User ({
        name: req.body.name,
        email: req.body.email,
        password: '',
    });

    // Set userpassword using the hashing within the setPassword method
    user.setPassword(req.body.password);

    const qSave = await user.save();

    if (!qSave) {
        return res
            .status(400)
            .json(err);
    }
    else {
        const JWtoken = user.generateJWT();
        return res
            .status(200)
            .json(JWtoken);
    }
};

// Login function
const login = async(req, res) => {
    
    // Check for parameters
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({"message": "Both fields are required for login"});
    }

    // Passport will handle authentication
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.status(404).json(err);
        }
    
        if (user) {
            // If authentication is successful, then return a 200 status and the token.
            const JWtoken = user.generateJWT();
            res.status(200).json({JWtoken})
        }
        else { // Authentication failed.
            res.status(201).json(err);
        }
    }) (req, res);
};

module.exports = {
    register,
    login
}
