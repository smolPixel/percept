// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function (hook) {
    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations
    const mongooseClient = hook.app.get("mongooseClient");

    

    if(! mongooseClient.Types.ObjectId.isValid(hook.data.leadResearcher)){
      //we did not receive directly an ID, but it might a a valid email, lets try and find a matching user

      //we'll use a Mongoose call directly, no need for all the fancy Feathers/service stuff
      var Users = mongooseClient.model('users');

      return new Promise(function(resolve, reject){
        Users.findOne({email: hook.data.leadResearcher}, function(err, user){
          if(err){
            reject(err);
          }
          if(!user){
            reject(new Error("Provided email: "+ hook.data.leadResearcher + "for leadResearcher did not match any user"));
          }
          else{
            hook.data.leadResearcher = user._id;
            resolve(hook);
          }
        });
      })
      
    }
    else{
      return hook;
    }
    
  };
};
