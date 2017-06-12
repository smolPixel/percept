// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

//TODO: do the same but for facebook!

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function (hook) {
    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations
    if(hook.data.google){
      hook.data.email = hook.data.google.profile.emails[0].value;
    }


    return Promise.resolve(hook);
  };
};
