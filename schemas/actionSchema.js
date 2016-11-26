var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var actionSchema = new Schema({
    type: String,
    moneyraised: Number,
    optionpool: Number
});

module.exports = mongoose.model('Action', actionSchema);