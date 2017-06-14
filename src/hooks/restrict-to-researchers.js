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
      if(hook.type === "after" && hook.method === "get"){
        return new Promise(function(resolve, reject){
          mongooseClient.model('experiments').findByID(hook.result.experiment, function(err, exp){
            if(err) reject(err);
            if(!exp.researchers.includes(hook.params.user._id)){
              reject("not allowed to view this participation")
            }
            else{
              resolve(hook);
            }
          })
        })
      }
      function restrict(exp){
        if(! exp.researchers.includes(hook.params.user.id)){
          throw new Error("Viewing experimental data is restricted to the research team");
        }
        else{
          hook.result = exp
          return hook;
        }
      }

      if(hook.method === 'get'){
        var subjectID =  hook.params.user._id.toString();
        return hook.app.service('/participations').find({subject: subjectID}, function(exp){
          
          return restrict(exp);
        });
      }
      else if(hook.method ==='find'){
        return hook.app.service('/experiments').find({label: hook.params.query.label}, function(exp){
          return restrict(exp);
        });
      }
      
    }
    else{
      throw new Error("You must be authenticated to use this endpoint.")
    }
  };
};
