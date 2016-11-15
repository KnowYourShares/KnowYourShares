var bodyParser = require('body-parser');
var morgan = require('morgan');

function _config(app) {
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(morgan('dev'));
}

module.exports = {
    config: _config
};