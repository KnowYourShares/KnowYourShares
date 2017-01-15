'use strict';

//browserify-shim dependencies (can be edited in package.json)
require('angular');
require('angular-ui-router');
require('ngResource');
require('angular-ui-router.stateHelper');
require('angular-animate');
require('angular-aria');
require('angular-messages');
require('angular-material');
require('angular-chart.js');
require('angular-clipboard');
require('svg-assets-cache');
require('chartist-plugin-tooltips');
require('angular-chartist.js');

window.Chartist = require('chartist.js');
window._ = require('underscore');

//app entry point
require('./app');

//exporting services
module.exports =
  angular.module('app.components', [
    require('./directives').name,
    require('./resources').name,
    require('./services').name
]);
