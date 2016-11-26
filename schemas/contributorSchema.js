var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var contributorSchema = new Schema({
    type: String,
    name: String,
    shares: Number
});

module.exports = mongoose.model('Contributor', contributorSchema);