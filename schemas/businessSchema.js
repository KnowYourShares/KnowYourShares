var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var BusinessSchema = new Schema({
    name: String,
    value: Number,
    premoney: Number,
    postmoney: Number,
    founders: [{}],
    investors: [{}]
});

module.exports = mongoose.model('Business', BusinessSchema);
