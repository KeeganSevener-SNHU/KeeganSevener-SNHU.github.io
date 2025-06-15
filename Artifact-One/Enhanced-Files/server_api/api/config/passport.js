const passport = require("passport");
const LocalStrategy = require("passport-local");
// Need too import mongoose, the user schema, and the MongoDB collection
const mongoose = require("mongoose");
const Users = require("../models/users");
const User = mongoose.model("accounts");

// Passport module for authenticating user accounts.
passport.use(
    // Local strategy validates the email and password
    new LocalStrategy(
        {
            usernameField: "email",
        },
        async(username, password, done) => {
            const qRequest = await User.findOne({email: username}).exec();
            // IF username is incorrect
            if (!qRequest) {
                // THEN respond with
                return done(null, false, 
                    {message: "Incorrect username"}
                );
            }
            // IF password is incorrect
            if (!qRequest.validPassword(password)) {
                // THEN respond with
                return done(null, false, 
                    {message: "Incorrect password"}
                );
            }
            return done(null, qRequest);
        }
    )
)