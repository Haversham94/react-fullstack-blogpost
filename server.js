// Main file for the server
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const http = require('http');
const app = express();

const router = require('./router');

// App setup
app.use(morgan('combined')); // for logging and debugging
app.use(bodyParser.json({ type: '*/*' }));
router(app);

// Server setup
const PORT = process.env.PORT || 3030;
const server = http.createServer(app);
server.listen(PORT);
console.log('Server is listening on port: ', PORT);
