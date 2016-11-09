'use strict';

module.exports = /*@ngInject*/
function routesConfig($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('app', {
        url: '/',
        templateUrl: 'app/layout.html',
        controller: 'appController',
        controllerAs: 'app'
      });
  };
