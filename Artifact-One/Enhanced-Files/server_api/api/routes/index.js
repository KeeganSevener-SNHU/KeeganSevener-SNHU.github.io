/*
** Routing file for directing the CRUD requests
*/

const express = require('express');
const router = express.Router();
// Enable JSON Web Tokens
const jwt = require('jsonwebtoken');


// Method to authenticate the provided JWT
function authenticateJWT(req, res, next) {
    // Get authorization header
    const authHeader = req.headers['authorization'];
    
    // Check if header exists
    if (authHeader == null) {
        console.log('Auth Header Required but NOT PRESENT!');
        return res.sendStatus(401);
    }
    // Split header and check if it is valid.
    let headers = authHeader.split(' ');
    if (headers.length < 1) {
        console.log('Not enough tokens in Auth Header: ' +
        headers.length);
        return res.sendStatus(501);
    }

    const token = authHeader.split(' ')[1];

    // Check that JWT exists 
    if (token == null) {
        console.log('Null Bearer Token');
        return res.sendStatus(401);
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET, 
        (err, verified) => {
        if (err) {
            return res.sendStatus(401).json('Token Validation Error!');
        }
        // Set the auth parameter to the decoded object
        req.auth = verified;
    });
    // Tells function to continue or this will hang forever
    next();
}



// import the controllers for routing
const tripsListController = require('../controllers/trips');
const authController = require('../controllers/authentication');
const { validate } = require('../models/trip-schema');

router.route('/register').post(authController.register);
router.route('/login').post(authController.login);


// Define the endpoints
router
    .route('/trips')
    .get(authenticateJWT, tripsListController.tripsList)
    .post(authenticateJWT, tripsListController.tripsAddTrip);

// GETs a route via trip ID.
router
    .route('/trips/:tripCode')
    .get(authenticateJWT, tripsListController.tripFindByCode)
    .put(authenticateJWT, tripsListController.tripsUpdateTrip)
    .delete(authenticateJWT, tripsListController.tripDeleteOne);
module.exports = router;