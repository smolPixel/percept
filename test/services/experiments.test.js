const assert = require('assert');
const app = require('../../src/app');

describe('\'experiments\' service', () => {
  it('registered the service', () => {
    const service = app.service('experiments');

    assert.ok(service, 'Registered the service');
  });
});
