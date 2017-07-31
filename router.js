var axios = require('axios');

module.exports = function(app) {
    app.get('/', function(req, res, next) {
        axios
            .get('http://localhost:5555/posts')
            .then(response => {
                res.send(response);
            })
            .catch(error => {
                res.send(error);
            });
    });
};
