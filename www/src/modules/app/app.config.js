'use strict';

module.exports = /*@ngInject*/
  function config($locationProvider, $httpProvider, $mdThemingProvider, createBusinessProvider, putBusinessProvider, deleteBusinessProvider, getBusinessProvider) {
    $locationProvider.html5Mode(true);
    //HTTP
    $httpProvider.defaults.headers.common.Accept = 'application/json';
    $httpProvider.defaults.headers.common['Content-Type'] = 'application/json; charset=UTF-8';

    $mdThemingProvider.theme('default')
      .primaryPalette('blue')
      .accentPalette('indigo');

    //LOCAL
    var restConfig = {
      baseUrl: "http://localhost:8080" || ''
    };

    //OPENSHIFT
    /*var restConfig = {
      baseUrl: "http://paeproject-unii.rhcloud.com" || ''
    };*/

    createBusinessProvider.config(restConfig);
    putBusinessProvider.config(restConfig);
    deleteBusinessProvider.config(restConfig);
    getBusinessProvider.config(restConfig);


  };
