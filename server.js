// Main file for the server
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const http = require('http');
const cookieSession = require('cookie-session');
const mongoose = require('mongoose');
const passport = require('passport');
mongoose.Promise = require('bluebird');
const expressGraphQL = require('express-graphql');

const app = express();

const schema = require('./schema/schema');
require('./models/User');
const router = require('./router');
const config = require('./config');

mongoose.connect(config.mongoURI);

// App setup
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [config.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(morgan('combined')); // for logging and debugging
app.use('/graphql', expressGraphQL({ schema, graphiql: true }));
app.use(bodyParser.json({ type: '*/*' }));
router(app);

// Server setup
const PORT = process.env.PORT || 3030;
const server = http.createServer(app);
server.listen(PORT);
console.log('Server is listening on port: ', PORT);
