// participations-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const Session = require("../schemas/session");

module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const Schema = mongooseClient.Schema;
  const SessionSchema = Session(app);


  const participations = new mongooseClient.Schema({
    experiment: { type: Schema.Types.ObjectId, ref:'experiments', required: true },
    subject:    {type: Schema.Types.ObjectId, ref:'users', required: true},

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },

    sessions:     [SessionSchema],

    isDropout: {type: Boolean, required:true, default: true}
  });

  return mongooseClient.model('participations', participations);
};
