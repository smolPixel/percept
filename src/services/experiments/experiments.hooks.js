const { authenticate } = require('feathers-authentication').hooks;

const setTimeline = require('../../hooks/set-timeline');

const replaceEmailWithId = require('../../hooks/replace-email-with-id');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [replaceEmailWithId()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [setTimeline()],
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
