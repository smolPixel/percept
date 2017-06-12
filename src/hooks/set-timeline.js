// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function (hook) {
    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations

    //manually update the timeline parameter

    var model = this.Model;

    return new Promise(function(resolve, reject){
      if(hook.data.timeline){
        model.findOne({id: hook.result.id}, function(err, instance){
          instance.timeline = hook.data.timeline;
          instance.save(function(error){
            if(error){
              reject(error);
            }
            else{
              resolve(hook);
            }
          });
          
        })
      }
      else{
        resolve(hook);
      }
    })

    

    


    
  };
};
