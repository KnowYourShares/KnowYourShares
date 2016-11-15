var mongoose = require ('mongoose');
var Schema = mognoose.Schema;
var Action = mongoose.model('Action');
var Contributor = mongoose.model('Contributor');

var companySchema = new Schema({
    value: Number,
    premoney: Number,
    postmoney: Number,
    action: [{ type: Schema.ObjectId, ref: "Action" }],
    contributor: [{ type: Schema.ObjectId, ref: "Contributor" }]
});

module.exports = mongoose.model('Company', companySchema);
