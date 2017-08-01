var axios = require('axios');

module.exports = function(app) {
    app.get('/api/posts', function(req, res, next) {
        axios
            .get('http://localhost:5555/posts/')
            .then(response => {
                res.send(response.data);
            })
            .catch(error => {
                res.send(error);
            });
    });
    app.post('/api/posts', function(req, res, next) {
        axios
            .post('http://localhost:5555/posts/', req.body)
            .then(response => {
                res.send(response);
            })
            .catch(error => {
                res.send(error);
            });
    });
    app.get('/api/posts/:id', function(req, res, next) {
        axios
            .get(`http://localhost:5555/posts/${req.params.id}`)
            .then(response => {
                res.send(response.data);
            })
            .catch(error => {
                res.send(error);
            });
    });
    app.delete('/api/posts/:id', function(req, res, next) {
        axios
            .delete(`http://localhost:5555/posts/${req.params.id}`)
            .then(() => {
                res.status(204).send();
            })
            .catch(error => {
                res.send(error);
            });
    });
};
