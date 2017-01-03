'use strict';

module.exports =
  angular.module('app.component.services', [])
    .service('roundService', require('./rounds-services/rounds.services'));
