// Require the db and Trip schema
const Mongoose = require('./db');
const Trip = require('./travlr');

var fs = require('fs');
var trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8'));

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
