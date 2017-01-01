var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var BusinessSchema = new Schema({
    companyValue: Number,
    founders: [{}],
    investors: [{}],
    employees:[{}],
    rounds:[{}],
    password : {
      type: Number,
      default: function() {
            return Math.floor((Math.random() * 99999) + 1);
      }
    }
});

module.exports = mongoose.model('Business', BusinessSchema);
