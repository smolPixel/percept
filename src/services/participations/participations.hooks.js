const { authenticate } = require('feathers-authentication').hooks;
const {queryWithCurrentUser, associateCurrentUser, restrictToOwner} = require("feathers-authentication-hooks");
var {disallow, disableMultiItemChange} = require('feathers-hooks-common');

const enforceQueryParam = require('../../hooks/enforce-query-param');

const restrictToResearchers = require('../../hooks/restrict-to-researchers');

module.exports = {
  before: {
    all: [ authenticate('jwt')],
    find: [
      enforceQueryParam(), 
      restrictToResearchers()
    ],
    get: [restrictToResearchers()],
    create: [associateCurrentUser({as:'subject'})],
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
    create: [],
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
