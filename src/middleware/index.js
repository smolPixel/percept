const handler = require('feathers-errors/handler');
const notFound = require('feathers-errors/not-found');
const auth = require('feathers-authentication');
const path = require('path');

var router = require('../../routes');


module.exports = function () {
  // Add your custom middleware here. Remember, that
  // in Express the order matters, `notFound` and
  // the error handler have to go last.
  const app = this;

  //register our template engine
  app.set('views', path.join(__dirname, '../../views'));
  app.set('view engine', 'pug');

  app.use('/', router);

  router.post('/login', auth.express.authenticate('local', {successRedirect: '/', failureRedirect: '/login'}));

  app.use(notFound());
  app.use(handler());
};
