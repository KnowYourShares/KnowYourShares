'use strict';

module.exports =
  angular.module('app.component.directives', [])
    .directive('filterLocation', require('./filters-location/location.component'))
    .directive('filterIndustries', require('./filters-industries/industries.component'));

