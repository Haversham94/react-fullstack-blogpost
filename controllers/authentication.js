const axios = require('axios');
const jwt = require('jwt-simple');
const _ = require('lodash');
const bcrypt = require('bcrypt-nodejs');
const config = require('../config');
const passport = require('passport');

const Utils = require('../auth/utils');

exports.signup = function(req, res) {
    const email = req.body.email;
    let password = req.body.password;
    const firstname = req.body.firstname;
    const pseudo = req.body.pseudo;
    const age = req.body.age;
    axios.get('http://localhost:5555/users').then(response => {
        const users = response.data;

        if (_.find(users, user => user.email === email)) {
            return res
                .status(422)
                .send({ error: 'User with this email already exist' });
        }
        bcrypt.genSalt(10, (err, salt) => {
            if (err) return err;

            //there is no error
            bcrypt.hash(password, salt, null, (err, hash) => {
                if (err) return err;

                password = hash;
                // password successfully hashed
                // api call to persist user
                axios
                    .post('http://localhost:5555/users', {
                        email: email,
                        password: password,
                        firstname: firstname,
                        pseudo: pseudo,
                        age: age
                    })
                    .then(response => {
                        //successfully persited data
                        res.send({
                            success: Utils.tokenForUser(response.data)
                        });
                    });
            });
        });
    });
};
exports.signin = function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        const error = err || info;
        console.log(info);
        if (error) {
            return res.status(401).json(error);
        }
        if (!user)
            return res
                .status(401)
                .json({ message: 'Something went wrong, please try again.' });
        const token = Utils.tokenForUser(user);
        res.json({ token });
    })(req, res, next);
};
