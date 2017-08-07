const passport = require('passport');
const axios = require('axios');
const JwtStrategy = require('passport-jwt').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const bcrypt = require('bcrypt-nodejs');
const LocalStrategy = require('passport-local');
const ExtractJwt = require('passport-jwt').ExtractJwt;
const _ = require('lodash');
const mongoose = require('mongoose');
const config = require('../config');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });
});
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};

const googleStrategyOptions = {
    clientID: config.googleClientID,
    clientSecret: config.googleClientSecret,
    callbackURL: '/auth/google/callback'
};
// create google strategy
const googleLogin = new GoogleStrategy(
    googleStrategyOptions,
    (accessToken, refreshToken, profile, done) => {
        User.findOne({ googleId: profile.id }).then(existingUser => {
            if (existingUser) {
                // dont store the user
                done(null, existingUser);
            } else {
                new User({ googleId: profile.id })
                    .save()
                    .then(user => done(null, user));
            }
        });
    }
);

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
            return done(null, false);
        } else {
            bcrypt.compare(password, existingUser.password, (err, isMatch) => {
                if (err) return done(err, false);
                if (!isMatch) return done(null, false);
                return done(null, existingUser);
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
            return done(null, response.data);
        })
        .catch(err => {
            return done(err, false); // no user found
        });
});

passport.use(jwtLogin);
passport.use(localLogin);
passport.use(googleLogin);
