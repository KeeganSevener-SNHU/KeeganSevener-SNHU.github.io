// Require mongoose and define the database string
const mongoose = require('mongoose');
const host = process.env.DB_HOST || '127.0.0.1';
const dbURI = `mongodb://${host}/travlr`;
const readLine = require('readline');

// Build the connection string and establish a connection timeout.
const connect = () => {
    setTimeout(() => mongoose.connect(dbURI, {}), 3000);
}

// Create the event listeners for connecting, disconnecting, and errors
mongoose.connection.on('connected', () => {
        console.log(`Mongoose connected to ${dbURI}`);
    });
    mongoose.connection.on('error', err => {
        console.log('Mongoose connection error: ', err);
    });
    mongoose.connection.on('disconnected', () => {
        console.log('Mongoose disconnected');
    });

// Windows specific listener, just in case.
if (process.platform === 'win32') {
    const r1 = readLine.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    r1.on('SIGINT', () => {
        process.emit("SIGINT");
    });
    }


// The "Graceful Shutdown" for closing connections.
const gracefulShutdown = (msg) => {
    mongoose.connection.close(() => {
        console.log(`Mongoose disconnected through ${msg}`);
    });
    };


// Listeners to invoke the Graceful Shutdown function
process.once('SIGUSR2', () => {
    gracefulShutdown('nodemon restart');
    process.kill(process.pid, 'SIGUSR2');
});

// When the application terminates we call this.
process.on('SIGINT', () => {
    gracefulShutdown('app termination');
    process.exit(0);
    });

// Shutdown when the container terminates
process.on('SIGTERM', () => {
    gracefulShutdown('app shutdown');
    process.exit(0);
    });

// Connect to DB and import the Mongoose schema.
connect();
require('./travlr');
module.exports = mongoose;