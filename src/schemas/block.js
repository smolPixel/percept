

module.exports = function(app){             //Is this what they call dependency injection??? woah dude!
    const mongooseClient = app.get('mongooseClient');

    var Block = mongooseClient.Schema({
        name: {type: String},
        type: {type: String, required: true}
    },{
        strict: false                       //core feature here: we can save whatever kind of block with whatever fields so as to accomodates all the jsPsych blocks
    });                                     //with a single Schema. We will add massive validation to offset the risks this presents.


    Block.add({timeline: [Block] });         //Blocks are recursive through their timeline property, just like in jsPsych


    Block.pre('validate', function(next){

        next()
    });

    Block.pre('save', function(next){
        var something = 'yes'
        next()
    })

    return Block;
}