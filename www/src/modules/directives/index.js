'use strict';

module.exports =
  angular.module('app.component.directives', [])
    .directive('filterLocation', require('./filters-location/location.component'))
    .directive('filterIndustries', require('./filters-industries/industries.component'))
    .directive('filterFunctions', require('./filters-functions/functions.component'))
    .directive('filterAge', require('./filters-age/age.component'));

