var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var ActionSchema = new Schema({
    type: String,
    moneyraised: Number,
    optionpool: Number
});

module.exports = mongoose.model('Action', ActionSchema);
