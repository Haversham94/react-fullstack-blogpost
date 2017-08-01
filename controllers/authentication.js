const axios = require('axios');
const jwt = require('jwt-simple');
const _ = require('lodash');
const bcrypt = require('bcrypt-nodejs');
const config = require('../config');

function tokenForUser(user) {
    console.log(user.id);
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signup = function(req, res, next) {
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
                        res.send({ success: tokenForUser(response.data) });
                    });
            });
        });
    });
};
exports.signin = function(req, res) {
    res.send({ token: tokenForUser(req.user) });
};
