// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const { existsByDot } = require("feathers-hooks-common");

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function (hook) {
    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations
    if(!existsByDot(hook.params.query, options.name)){
      throw new Error("This endpoint must be called with a "+options.name+" URL query parameter");
    }
    return hook;
  };
};
