'use strict';

module.exports = /*@ngInject*/
  function routesConfig($stateProvider, $urlRouterProvider, stateHelperProvider) {
    $urlRouterProvider.when('/business/:id', '/business/:id/');
    $urlRouterProvider.otherwise('/');

    stateHelperProvider
      .state({
        name: 'app',
        abstract: true,
        templateUrl: 'app/layout.html',
        controller: 'appController',
        controllerAs: 'app',
        children: [{
          name: 'home',
          url: '/',
          templateUrl: 'app/home/home.html',
          controller: 'homeController',
          controllerAs: 'home'
        }, {
          name: 'filters',
          url: '/business',
          abstract: true,
          templateUrl: 'app/filters/filters.html',
          controller: 'filtersController',
          controllerAs: 'filters',
          children: [{
            name: 'location',
            url: '/:id/:password',
            template: '<filter-location></filter-location>'
          }]
        },{
          name: 'results',
          url: '/results',
          abstract: true,
          templateUrl: 'app/results/results.html',
          controller: 'resultsController',
          controllerAs: 'results',
          children: [{
            name: 'results',
            url: '/:id/:password',
            template: '<results-view></results-view>'
          }]
        }]
      });
  };
