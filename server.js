var express = require('express');
var applicationConstants = require('./constants/application');
var configServer = require('./config');
var mongoose = require('mongoose');
var routes = require('./routes');

/* SERVER CONFIG */
var app = express();
configServer.config(app);

/* MONGODB */
// if OPENSHIFT env variables are present, use the available connection info:
if (process.env.OPENSHIFT_MONGODB_DB_URL) {
    mongoose.connect(process.env.OPENSHIFT_MONGODB_DB_URL + 'pae');
} else {
    mongoose.connect(applicationConstants.MONGO_IP + 'pae');
}

/* SERVER ROUTES */
app.use('/rest', routes.restRoute);

app.use('/site', express.static(__dirname + '/www/release/'));
app.get('/site/*', function (req, res) {
    res.sendFile(__dirname + '/www/release/index.html');
});

// Error 404 resource not found
app.all('*', function (req, res) {
    res.status(404).send("Recurso no encontrado");
});

/* SERVE */
var port = applicationConstants.SERVER_PORT;
app.listen(port, applicationConstants.SERVER_IP);

console.log('Listening to port', port);