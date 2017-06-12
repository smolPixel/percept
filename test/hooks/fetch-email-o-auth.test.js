const assert = require('assert');
const fetchEmailOAuth = require('../../src/hooks/fetch-email-o-auth');

describe('\'fetchEmailOAuth\' hook', () => {
  it('runs the hook', () => {
    // A mock hook object
    const mock = {};
    // Initialize our hook with no options
    const hook = fetchEmailOAuth();

    // Run the hook function (which returns a promise)
    // and compare the resulting hook object
    return hook(mock).then(result => {
      assert.equal(result, mock, 'Returns the expected hook object');
    });
  });
});
