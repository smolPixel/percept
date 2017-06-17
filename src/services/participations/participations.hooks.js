const { authenticate } = require('feathers-authentication').hooks;
const {queryWithCurrentUser, associateCurrentUser, restrictToOwner} = require("feathers-authentication-hooks");
var {disallow, disableMultiItemChange, pluck, populate, validateSchema} = require('feathers-hooks-common');
const Ajv = require('ajv');
const enforceQueryParam = require('../../hooks/enforce-query-param');

const restrictToResearchers = require('../../hooks/restrict-to-researchers');

const addSettings = require('../../hooks/add-settings');
const replaceWithID = require('../../hooks/replace-field-with-id')

const populateParticipation = require('../../hooks/populate-participation');
const participationUpdateSchema = require('./participations.validation')

module.exports = {
  before: {
    all: [ authenticate('jwt')],
    find: [],
    get: [populateParticipation()],
    create: [associateCurrentUser({as:'subjectId'}), pluck('subjectId', 'experiment'), replaceWithID({replacedQueryField:'experiment', targetModel:'experiments', uniqueField:'label', targetField:'experimentId'})],
    update: [
      disableMultiItemChange(),
      restrictToOwner({ownerField:'subjectId'}),
      validateSchema(participationUpdateSchema, Ajv)
    ],
    patch: [
      disableMultiItemChange(),
      restrictToOwner({ownerField:'subjectId'}),
      disallow('external')
    ],
    remove: [disallow('external')]
  },

  after: {
    all: [],
    find: [populateParticipation()],
    get: [],
    create: [
      addSettings(),
      pluck("_id", "data", "experiment" )
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