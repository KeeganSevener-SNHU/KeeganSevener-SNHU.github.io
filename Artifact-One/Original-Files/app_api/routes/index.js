const express = require('express');
const router = express.Router();
// Enable JSON Web Tokens
const jwt = require('jsonwebtoken');



// Method to authenticate our JWT
function authenticateJWT(req, res, next) {
    
    //console.log('In Middleware');
    const authHeader = req.headers['authorization'];
    
    //console.log('Auth Header: ' + authHeader);
    
    if (authHeader == null) {
        console.log('Auth Header Required but NOT PRESENT!');
        return res.sendStatus(401);
    }
    let headers = authHeader.split(' ');
    if (headers.length < 1) {
        console.log('Not enough tokens in Auth Header: ' +
        headers.length);
        return res.sendStatus(501);
    }

    const token = authHeader.split(' ')[1];

    // console.log('Token: ' + token);
    if (token == null) {
        console.log('Null Bearer Token');
        return res.sendStatus(401);
    }
    
    //console.log(process.env.JWT_SECRET);
    //console.log(jwt.decode(token));

    const verified = jwt.verify(token, process.env.JWT_SECRET, 
        (err, verified) => {
        if (err) {
            return res.sendStatus(401).json('Token Validation Error!');
        }
        // Set the auth paramto the decoded object
        req.auth = verified;
    });
    // Tells function to continue or this will hang forever
        next();
    }




// import the controller from trips.js
const tripsListController = require('../controllers/trips');
const authController = require('../controllers/authentication');

router.route('/register').post(authController.register);
router.route('/login').post(authController.login);


// Define the endpoints
router
    .route('/trips')
    .get(tripsListController.tripsList)
    .post(authenticateJWT, tripsListController.tripsAddTrip);

// GETs a route via trip ID.
router
    .route('/trips/:tripCode')
    .get(tripsListController.tripFindByCode)
    .put(authenticateJWT, tripsListController.tripsUpdateTrip);

module.exports = router;