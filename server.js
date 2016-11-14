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
app.use('/', routes.restRoute);

app.use('/', express.static(__dirname + '/www/build/'));

// Error 404 resource not found
app.all('/rest/*', function (req, res) {
    res.status(404).send("Recurso no encontrado");
});

app.get('/*', function (req, res) {
    console.log(req);
    res.sendFile(__dirname + '/www/build/index.html');
});






/* SERVE */
var port = applicationConstants.SERVER_PORT;
app.listen(port, applicationConstants.SERVER_IP);

console.log('Listening to port', port);