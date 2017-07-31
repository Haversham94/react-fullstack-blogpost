// Main file for the server
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const app = express();

// App setup

// Server setup
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
