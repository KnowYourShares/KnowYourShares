var bodyParser = require('body-parser');
var morgan = require('morgan');
var cors = require('cors');

function _config(app) {
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(morgan('dev'));

    var corsOptions = {
        credentials: true,
        origin: '*'
    };

    app.use(cors(corsOptions));
}

module.exports = {
    config: _config
};