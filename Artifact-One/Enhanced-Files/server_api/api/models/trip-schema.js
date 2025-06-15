const mongoose = require('mongoose');

// Schema for trip documents to store in MongoDB
const tripSchema = new mongoose.Schema({
    sku: {type: String, required: true, index: true},
    price: {type: String, required: true, index: true},
    title: {type: String, required: true, index: true},
    descrip: {type: String, required: true},
    description: {type: String, required: true},
    date: {type: String, required: true},
    image: {type: String, required: true},
    range: {type: String, required: true},
    amenity: {type: Array, required: true}
});

// Create the collection 'react-trips' with the tripSchema.
const Trip = mongoose.model('react-trips', tripSchema);
module.exports = Trip;