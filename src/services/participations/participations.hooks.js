const { authenticate } = require('feathers-authentication').hooks;
const {queryWithCurrentUser, associateCurrentUser, restrictToOwner} = require("feathers-authentication-hooks");
var {disallow, disableMultiItemChange, pluck, populate} = require('feathers-hooks-common');

const enforceQueryParam = require('../../hooks/enforce-query-param');

const restrictToResearchers = require('../../hooks/restrict-to-researchers');

const addSettings = require('../../hooks/add-settings');
const replaceWithID = require('../../hooks/replace-field-with-id')

module.exports = {
  before: {
    all: [ authenticate('jwt')],
    find: [
      enforceQueryParam(), 
      restrictToResearchers()
    ],
    get: [restrictToResearchers()],
    create: [associateCurrentUser({as:'subject'}), replaceWithID({replacedField:'experiment', targetModel:'experiments', uniqueField:'label'})],
    update: [
      disableMultiItemChange(),
      restrictToOwner({ownerField:'subject'})
    ],
    patch: [
      disableMultiItemChange(),
      restrictToOwner({ownerField:'subject'}),
      disallow('external')
    ],
    remove: [disallow('external')]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [
      pluck("_id", "data", "experiment" ), 
      addSettings()
      ],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
