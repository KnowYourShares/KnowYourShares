'use strict';

//browserify-shim dependencies (can be edited in package.json)
require('angular');
require('angular-ui-router');
require('ngResource');
require('angular-ui-router.stateHelper');
window._ = require('underscore');

//app entry point
require('./app');

//exporting services
module.exports =
    angular.module('app.components', [
        require('./directives').name
    ]);
