var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var companySchema = new Schema({
    value: Number,
    premoney: Number,
    postmoney: Number,
    actions: [{ type: Schema.ObjectId, ref: "Action" }],
    contributors: [{ type: Schema.ObjectId, ref: "Contributor" }]
});

module.exports = mongoose.model('Company', companySchema);
