// Desc: This file is the entry point for the application. 
// It is responsible for setting up an HTTP server and listening for connections on the port specified in the configuration.

/**
 * Module dependencies.
 */

import app from '../app.js';
import mongoose from 'mongoose';
import { createServer } from 'http';
import dotenv from 'dotenv'
dotenv.config()

/**
 * Get port from environment
 */

const PORT = (process.env.PORT || '8000');
const HOST = (process.env.HOST || 'localhost');
const ENV = (process.env.ENV || 'development');
const MONGO_URI = (process.env.MONGO_URI);





/**
 * Create HTTP server.
 */

const server = createServer(app);

// Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  server.listen(PORT);
  server.on('error', onError);
  server.on('listening', onListening);
  console.log(`Server running at http://${HOST}:${PORT}/`); 
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.log('Error connecting to MongoDB', err.message);
});

/**
 * Listen on provided port, on all network interfaces.
 */



/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = 'Port ' + PORT;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = 'Port ' + addr.port;
    console.log('Listening on ' + bind);
    console.log('Environment is set to ' + ENV);
}
