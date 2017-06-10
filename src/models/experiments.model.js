// experiments-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

var Block = require('../schemas/block');


module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');

  var BlockSchema = Block(app);

  const experiments = new mongooseClient.Schema({
    label: { type: String, required: true, unique: true, match: /^[A-Za-z]+$/ },    //a short label for internal use and url generation. should not be updatable
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    timeline: [BlockSchema]
  });

  return mongooseClient.model('experiments', experiments);
};
