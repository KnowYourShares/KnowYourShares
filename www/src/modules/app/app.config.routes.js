'use strict';

module.exports = /*@ngInject*/
  function routesConfig($stateProvider, $urlRouterProvider, stateHelperProvider) {
    $urlRouterProvider.otherwise('/');

    stateHelperProvider
      .state({
        name: 'app',
        abstract: true,
        templateUrl: 'app/layout.html',
        controller: 'appController',
        controllerAs: 'app',
        children: [
          {
            name: 'home',
            url: '/',
            templateUrl: 'app/home/home.html',
            controller: 'homeController',
            controllerAs: 'home'
          },
          // {
          //   name: 'filters',
          //   url: '/filters',
          //   abstract: true,
          //   templateUrl: 'app/filters/filters.html',
          //   controller: 'filtersController',
          //   controllerAs: 'filters',
          //   children: [
          //     {
          //       name: 'location',
          //       url: '/location',
          //       template: '<filter-location></filter-location>'
          //     },
          //     {
          //       name: 'industries',
          //       url: '/industries',
          //       template: '<filter-industries></filter-industries>'
          //     },
          //     {
          //       name: 'functions',
          //       url: '/functions',
          //       template: '<filter-functions></filter-functions>'
          //     },
          //     {
          //       name: 'age',
          //       url: '/age',
          //       template: '<filter-age></filter-age>'
          //     },
          //     {
          //       name: 'size',
          //       url: '/size',
          //       template: '<filter-size></filter-size>'
          //     },
          //     {
          //       name: 'results',
          //       url: '/results',
          //       template: '<filter-results></filter-results>'
          //     }
          //   ]
          // }
        ]
      });
  };
