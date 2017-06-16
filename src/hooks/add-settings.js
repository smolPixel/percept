// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {expField:"experimentId"}) { // eslint-disable-line no-unused-vars
  /**
   * After hook meant to be used just after Participation creation (when a participant request to start an experiment).
   * Attaches the experimental timeline and other settigns to the response, so that they can immediately run jsPsych.init() with it!
   */
  return function (hook) {
    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations

    const mongooseClient = hook.app.get("mongooseClient");
    //check that the just-created participation has a valid ObjectID at the provided fieldname in options.expField
    if(hook.result[options.expField] && mongooseClient.Types.ObjectId.isValid(hook.result[options.expField])){
      
      const Experiments = mongooseClient.model("experiments");
      return new Promise(function(resolve, reject){
        Experiments.findById(hook.result[options.expField], function(err, exp){
          if(err){
            reject(err);
          }
          else{
            //attach the timeline of the experiment to the response
            hook.result.timeline = exp.timeline;
            hook.result.extra_params  = exp.extra_params;
            resolve(hook);
          }
        });
      });
      
      
    }
    else{
      throw new Error("Unable to retrieve the experiment linked to the created participation throught its "+options.expField+" field");
    }

    
  };
};
