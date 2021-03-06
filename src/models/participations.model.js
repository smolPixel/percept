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
    experimentId: { type: Schema.Types.ObjectId, ref:'experiments', required: true, index:true },
    subjectId:    {type: Schema.Types.ObjectId, ref:'users', required: true, index:true},

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },

    data:     [SessionSchema],

    isDropout:  {type: Boolean, required:true, default: true},
    isClosed:   {type: Boolean, required:true, default:false}
  });

  return mongooseClient.model('participations', participations);
};
