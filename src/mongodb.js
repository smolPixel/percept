const mongoose = require('mongoose');

module.exports = function () {
  const app = this;

  //app.get(mongosedb not working 	
  //mongoose.connect('localhost/test');
  //mongoose.Promise = global.Promise;

  app.set('mongooseClient', mongoose);
};
