/**
 * A hook to add an array of owned experiments when getting a user
 * type: after
 * method: get
 * 
 * After this hook, the returned user instance will hold an array of all the labels of experiments he/she is a member of
 */

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars

  return function (hook) {

    //skip if somehow, the user already has had that set
    if(!typeof hook.result.ownedExperiments === "undefined"){
      return hook;
    }
    //This call will benefit greatly from an index on the "researchers" field on the Experiment Schema!
    return hook.app.service("experiments").find({query: {researchers: hook.result._id}}).then(exps =>{

      hook.result.ownedExperiments = [];
      exps.data.forEach(function(ownedExp, idx){
        hook.result.ownedExperiments.push(ownedExp.label);
      });
      return hook;
    });
  };
};
