var axios = require('axios');
const passport = require('passport');

const auth = require('./auth/passport');
const Authentication = require('./controllers/authentication');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });
module.exports = function(app) {
    app.get('/api', requireAuth, function(req, res) {
        res.send({ hi: 'there' });
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
    app.post('/signup', Authentication.signup);
    app.post('/api/signin', requireSignin, Authentication.signin);
};
