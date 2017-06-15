// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function (hook) {
    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations

    if(!hook.params.provider){
      //internal, just do it
      return hook
    }

    if(hook.params.user){
      const mongooseClient = hook.app.get("mongooseClient");
      //check if we are in an after hook for a single Participation request
      if(hook.type === "after" && hook.method === "get"){
        //we just need to query the related experiment,
        return new Promise(function(resolve, reject){
          mongooseClient.model('experiments').find({_id: hook.result.experiment, researchers: hook.params.user._id}, function(err, exp){
            if(err) reject(err);
            if(!exp){
              reject("not allowed to view this participation")
            }
            else{
              resolve(hook);
            }
          })
        })
      }
      else if(hook.type = "before" && hook.method === 'find'){
        return new Promise(function(resolve, reject){
          mongooseClient.model("experiments").find({label:hook.query.label, researchers:hook.params.user._id}, function(err, exp){
            if(err) reject(err);
            if(!exp){
              reject("You do not have permission to view data for this experiment");
            }
            resolve(hook)
          })
        });
        
      }
      else {
        throw new Error("This hook must be an after-get or a before-find hook");
      }
    }
    else{
      throw new Error("You must be authenticated to use this endpoint.");
    }
  };
};
