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
            url: '/:id',
            template: '<filter-location></filter-location>',
            resolve: {
              //TODO Killian
               Business: function functionName(getBusiness, $stateParams) {
                if($stateParams.id){
                  return getBusiness.get({
                    businessId: $stateParams.id
                  }).$promise;
                }else{
                  return {};
                }
              }
            }
          }]
        }]
      });
  };
