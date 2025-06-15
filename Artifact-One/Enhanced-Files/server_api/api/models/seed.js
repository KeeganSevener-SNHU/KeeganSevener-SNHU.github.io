/* This file is just used for initially seeding the database with the 
** JSON data from the 'data' folder.
*/

// Require the db and Trip schema
const Mongoose = require('./db');
const Trip = require('./trip-schema');

var fs = require('fs');
var trips = JSON.parse(fs.readFileSync('./api/data/react-trips.json', 'utf8'));

// Clear out any exisitng records with deleteMany and seed the new data.
const seedDB = async () => {
    await Trip.deleteMany({});
    await Trip.insertMany(trips);
};



// Close the connection once finished.
seedDB().then(async () => {
    await Mongoose.connection.close();
    process.exit(0);
})
