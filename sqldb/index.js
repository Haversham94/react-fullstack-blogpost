/**
 * Sequelize initialization module
 */
'use strict';
const config = require('../config');
const Sequelize = require('sequelize');

var db = {
    Sequelize,
    sequelize: new Sequelize(config.sequelize.uri, config.sequelize.options)
};

// Insert models below
db.Company = db.sequelize.require('../models/Company');

module.exports = db;
