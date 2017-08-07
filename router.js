var axios = require('axios');
const passport = require('passport');

require('./auth/passport');
const Authentication = require('./controllers/authentication');

const requireAuth = passport.authenticate('jwt', { session: false });

const requireGoogleAuthFirst = passport.authenticate('google', {
    scope: ['profile', 'email']
});
const requireGoogleAuth = passport.authenticate('google');

const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app) {
    app.get('/api', requireAuth, function(req, res) {
        res.send({
            hi:
                'very protected resource pass code: tout est 1 et 1 est tout DEV'
        });
    });
    app.get('/api/posts', function(req, res) {
        axios
            .get('http://localhost:5555/posts/')
            .then(response => {
                res.send(response.data);
            })
            .catch(error => {
                res.send(error);
            });
    });
    app.post('/api/posts', function(req, res) {
        axios
            .post('http://localhost:5555/posts/', req.body)
            .then(response => {
                res.send(response);
            })
            .catch(error => {
                res.send(error);
            });
    });
    app.get('/api/posts/:id', function(req, res) {
        axios
            .get(`http://localhost:5555/posts/${req.params.id}`)
            .then(response => {
                res.send(response.data);
            })
            .catch(error => {
                res.send(error);
            });
    });
    app.delete('/api/posts/:id', function(req, res) {
        axios
            .delete(`http://localhost:5555/posts/${req.params.id}`)
            .then(() => {
                res.status(204).send();
            })
            .catch(error => {
                res.send(error);
            });
    });
    app.get('/auth/google', requireGoogleAuthFirst);
    app.get('/auth/google/callback', requireGoogleAuth, function(req, res) {
        res.redirect('/');
    });
    app.get('/api/auth/me', function(req, res) {
        res.send(req.user);
    });
    app.get('/api/auth/logout', function(req, res) {
        req.logout();
        res.send(req.user);
    });
    app.post('/api/signup', Authentication.signup);
    app.post('/api/signin', Authentication.signin);
};
