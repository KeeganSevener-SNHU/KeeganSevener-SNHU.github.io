/*
//============================================================================
// Name        : server_api
// Author      : Keegan Sevener
// Date        : June 5, 2025
// Version     : 1.0
// Description : Project for SNHU CS499 Capstone.
//             : API server app for communicating between the Travlr front-end
//               and the MongoDB database.
//============================================================================
** Main server file for generating the express API app.
 */

var createError = require('http-errors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const express = require("express");
// requirements for passport.
var passport = require('passport');
require('dotenv').config();
require('./api/config/passport');

// Load the database
require('./api/models/db');
// Grab API router.
var apiRouter = require('./api/routes/index');
// Create port for API requests
const PORT = process.env.PORT || 3000;

// Setup express app.
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api', apiRouter);

app.use(passport.initialize());

// Enable CORS so that CRUD requests can be sent
app.use('/api', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Catch unauthorized error and create 401
app.use((err, req, res, next) => {
  if(err.name === 'UnauthorizedError') {
  res
  .status(401)
  .json({"message": err.name + ": " + err.message});
  }
});


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});