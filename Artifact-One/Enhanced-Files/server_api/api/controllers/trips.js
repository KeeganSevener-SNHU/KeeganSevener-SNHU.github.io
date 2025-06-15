// Require mongoose and travlr from models to get the collection from the MongoDB database
const mongoose = require('mongoose');
const Trip = require('../models/trip-schema');
const Model = mongoose.model('react-trips');
const jwt = require('jsonwebtoken');

// Authorization methods for validating the user role.
function checkWritePrivileges (req) {
    
    // Value to return
    var value = false;
    // Get token from header
    const token = req.headers['authorization'].split(' ')[1];
    
    // Check if token has valid user role.
    if ( jwt.decode(token).roles[0] === "writer" ||
         jwt.decode(token).roles[0] === "reactAdmin" ) 
    {
    // User is valid, set value to true.
        value = true;
    }
    return value;
}
function checkAdminPrivileges (req) {
    // Value to return
    var value = false;
    // Get token from header
    const token = req.headers['authorization'].split(' ')[1];

    // Check if token has valid user role.
    if ( jwt.decode(token).roles[0] === "reactAdmin" ) {
        // User is valid, set value to true.
        value = true;
    }
    return value;
}


// GET method for retrieving a single trip
const tripFindByCode = async(req, res) => {

    const returnData = await Model
    .find({ 'sku' : req.params.tripCode})
    .exec();

    if (!returnData) {
        return res.status(404).json(err);
    }
    else {
        return res.status(200).json(returnData);
    }
}


// GET method request for returning all the trips from the database's 'react-trips' collection
const tripsList = async(req, res) => {
    // Make call to database
    const returnData = await Model.find({}).exec();

    if (!returnData) {
        return res.status(404).json(err);
    }
    else {
        return res.status(200).json(returnData);
    }
}

// POST request to add a new trip
const tripsAddTrip = async (req, res) => {

    // Call Write privilege check
    var valid = checkWritePrivileges(req);

    // If user is not authorized, then return 401 status
    if (!valid) {
        return res.status(401).json(err);;
    }

    // Create new trip to add by grabbing data from the request body.
    const newTrip = new Trip ({
        sku: req.body.sku,
        price: req.body.price,
        title: req.body.title,
        descrip: req.body.descrip,
        description: req.body.description,
        date: req.body.date,
        image: req.body.image,
        range: req.body.range,
        amenity: req.body.amenity
    })

    const postReq = await newTrip.save();

    if (!postReq) {
        return res
            .status(400)
            .json(err);
    } else { // Return the successful trip addition
        return res
            .status(201)
            .json(postReq);
    }
}


// PUT: /trips/:tripCode - Adds a new Trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsUpdateTrip = async(req, res) => {


    // Call write privilege check
    var valid = checkWritePrivileges(req);

    // If user is not authorized, then return 401 status
    if (!valid) {
        return res.status(401).json(err);;
    }
    
    // Call the update function within MongoDB
    const updateTrip = await Model
        .findOneAndUpdate(
            { 'sku' : req.params.tripCode },
                {
                    sku: req.body.sku,
                    price: req.body.price,
                    title: req.body.title,
                    descrip: req.body.descrip,
                    description: req.body.description,
                    date: req.body.date,
                    image: req.body.image,
                    range: req.body.range,
                    amenity: req.body.amenity
                }
        )
        .exec();
        // If database returned no data
        if (!updateTrip) {
            return res
            .status(400)
            .json(err);
        }
        // Return resulting updated trip
        else {
            return res
            .status(201)
            .json(updateTrip);
        }
};


// DELETE operation for the MongoDB collection
const tripDeleteOne = async(req, res) => {

    // Call admin privilege check
    var valid = checkAdminPrivileges(req);

    // If user is not authorized, then return 401 status
    if (!valid) {
        return res.status(401).json(err);;
    }
    
    // Else, make API call
    else {
        const returnData = await Model
        .findOneAndDelete({ 'sku' : req.params.tripCode})
        .exec();


        if (!returnData) {
            return res.status(404).json(err);
        }
        else {
            return res.status(200).json(returnData);
        }
    }
}


module.exports = {
    tripsList,
    tripFindByCode,
    tripsAddTrip,
    tripsUpdateTrip,
    tripDeleteOne
};
