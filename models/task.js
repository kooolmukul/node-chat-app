var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var muv = require('mongoose-unique-validator');

var schema = new Schema({
	taskName: {type : String, required : true},
	description : {type: String, required : true},
    startTime : { type: Date},
    endTime :   { type: Date},
    assigedTo : [{type: Schema.Types.ObjectId, ref: 'User'}],
    createdAt : { type: Date, default: Date.now },
	approvedBy: [{type: Schema.Types.ObjectId, ref: 'User'}]
});

schema.plugin(muv);

module.exports = mongoose.model('Task', schema);