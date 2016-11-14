'use strict';

module.exports = /*@ngInject*/
    function routesConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');

        $stateProvider
            .state('app', {
                abstract: true,
                templateUrl: 'app/layout.html',
                controller: 'appController',
                controllerAs: 'app'
            })
            .state('app.home', {
                url: '/home',
                templateUrl: 'app/home/home.html',
                controller: 'homeController',
                controllerAs: 'home'
            })
    };
