'use strict';

module.exports = /*@ngInject*/
  function config($locationProvider, $httpProvider) {
    $locationProvider.html5Mode(true);
    //HTTP
    $httpProvider.defaults.headers.common.Accept = 'application/json';
    $httpProvider.defaults.headers.common['Content-Type'] = 'application/json; charset=UTF-8';
    $httpProvider.defaults.withCredentials = true;

    var restConfig = {
      baseUrl: "http://localhost:8080" || ''
    };

  };
