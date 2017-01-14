'use strict';

module.exports =
  angular.module('app.component.directives', [])
    .directive('filterLocation', require('./filters-location/location.component'))
    .directive('filterIndustries', require('./filters-industries/industries.component'))
    .directive('filterFunctions', require('./filters-functions/functions.component'))
    .directive('filterAge', require('./filters-age/age.component'))
    .directive('filterSize', require('./filters-size/size.component'))
    .directive('filterResults', require('./filters-results/results.component'))
    .component('inputShares', require('./input-shares/component'))
    .component('chartShares', require('./chart-shares/component'))
    .component('inputRound', require('./input-round/component'))
    .component('valuesLayout', require('./values-layout/component'));
