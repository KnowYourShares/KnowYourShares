'use strict';

//browserify-shim dependencies (can be edited in package.json)
require('angular');
require('angular-ui-router');
require('angular-animate');
require('angular-aria');
require('angular-messages');
require('angular-material');
require('satellizer');
require('ngResource');
window._ = require('underscore');

//app entry point
require('./app');

//exporting services
module.exports =
    angular.module('app.components', [
        require('./directives').name,
        require('./services').name,
        require('./resources').name
    ]);
