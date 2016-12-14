var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var BusinessSchema = new Schema({
    companyValue: Number,
    founders: [{}],
    investors: [{}],
    employees:[{}],
    rounds:[{}]
});

module.exports = mongoose.model('Business', BusinessSchema);
