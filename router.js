module.exports = function(app) {
  app.get('/', function(req, res, next) {
    res.send(['Keyboard', 'Screen','Headphones','Something...']);
  });
};
