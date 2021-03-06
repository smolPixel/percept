// Initializes the `experiments` service on path `/experiments`
const createService = require('feathers-mongoose');
const createModel = require('../../models/experiments.model');
const hooks = require('./experiments.hooks');
const filters = require('./experiments.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'experiments',
    Model,
    paginate,
    id: 'label'
  };

  // Initialize our service with any options it requires
  app.use('/experiments', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('experiments');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
