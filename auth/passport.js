const passport = require('passport');
const axios = require('axios');
const JwtStrategy = require('passport-jwt').Strategy;
const bcrypt = require('bcrypt-nodejs');
const LocalStrategy = require('passport-local');
const ExtractJwt = require('passport-jwt').ExtractJwt;
const _ = require('lodash');

const config = require('../config');

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};

// create local Strategy
const localLogin = new LocalStrategy({ usernameField: 'email' }, function(
    email,
    password,
    done
) {
    axios.get(`http://localhost:5555/users/`).then(response => {
        const users = response.data;
        const existingUser = _.find(users, user => user.email === email);
        if (!existingUser) {
            done(null, false);
        } else {
            bcrypt.compare(password, existingUser.password, (err, isMatch) => {
                if (err) done(err, false);
                if (!isMatch) done(null, false);
                done(null, existingUser);
            });
        }
    });
});

// create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
    axios
        .get(`http://localhost:5555/users/${payload.sub}`)
        .then(response => {
            //user with id === payload.sub exists
            done(null, response.data);
        })
        .catch(err => {
            done(err, false); // no user found
        });
});

passport.use(jwtLogin);
passport.use(localLogin);
