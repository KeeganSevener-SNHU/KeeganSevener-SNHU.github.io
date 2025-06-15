// Require mongoose and travlr from models to get the colletion from the MongoDB database
const mongoose = require('mongoose');
const Trip = require('../models/travlr');
const Model = mongoose.model('trips');


// GET method for retrieving a single trip
const tripFindByCode = async(req, res) => {

    const returnData = await Model
    .find({ 'code' : req.params.tripCode})
    .exec();

    if (!returnData) {
        return res.status(404).json(err);
    }
    else {
        return res.status(200).json(returnData);
    }
}


// GET method request for returning all the trips from the database's 'trips' collection
const tripsList = async(req, res) => {
    
    //Test code
    /*
    tripsTest = [];
    tripsTest = mongoose.connection.db.collection('trips').find({}).toArray();
    console.log(tripsTest);
    */
    
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
    
    const newTrip = new Trip ({
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description
    })

    const postReq = await newTrip.save();

    // log for testing
    //console.log(postReq);

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
    
    // Uncomment for debugging
    //console.log(req.params);
    //console.log(req.body);

    const updateTrip = await Model
        .findOneAndUpdate(
            { 'code' : req.params.tripCode },
                {
                    code: req.body.code,
                    name: req.body.name,
                    length: req.body.length,
                    start: req.body.start,
                    resort: req.body.resort,
                    perPerson: req.body.perPerson,
                    image: req.body.image,
                    description: req.body.description
                }
        )
        .exec();
        
        if (!updateTrip) { // Database returned no data
            return res
            .status(400)
            .json(err);
        } else { // Return resulting updated trip
            return res
            .status(201)
            .json(updateTrip);
        }
};

module.exports = {
    tripsList,
    tripFindByCode,
    tripsAddTrip,
    tripsUpdateTrip
};
