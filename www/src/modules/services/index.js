'use strict';

var createBusiness = function() {
  // Configuration and default parameters
  var params = {};
  var baseUrl = '';
  var serviceBaseUrl = '';

  this.config = function(config) {
    params = angular.copy(config);
    baseUrl = params.baseUrl || baseUrl;
    delete params.baseUrl;
  };

  this.$get = function($resource) {
    // Allowed operations
    var actions = {
      startBusiness: {
        // TODO: -------------- En esta URL quizás falta un ID? ------------
        url: baseUrl + serviceBaseUrl,
        method: 'POST'
      }
    };
    return $resource(baseUrl + serviceBaseUrl, null, actions);
  };
};

var saveBusiness = function() {
  // Configuration and default parameters
  var params = {};
  var baseUrl = '';
  var serviceBaseUrl = '';

  this.config = function(config){
    params = angular.copy(config);
    baseUrl = params.baseUrl || baseUrl;
    delete params.baseUrl;
  };

  this.$get = function($resource) {
    // Allowed operations
    var actions = {
      save: {
        url: baseUrl + serviceBaseUrl + ':businessId',
        method: 'PUT'
      }
    };
    return $resource(baseUrl + serviceBaseUrl, null, actions);
  };
};

var getBusiness = function() {
  // Configuration and default parameters
  var params = {};
  var baseUrl = '';
  var serviceBaseUrl = '';

  this.config = function(config) {
    params = angular.copy(config);
    baseUrl = params.baseUrl || baseUrl;
    delete params.baseUrl
  };

  this.$get = function($resource) {
    // Allowed operations
    var actions = {
      get: {
        url: baseUrl + serviceBaseUrl + ':businessId',
        method: 'GET'
      }
    };
    return $resource(baseUrl + serviceBaseUrl,null,actions);
  };
};

var deleteBusiness = function() {
  // Configuration and default parameters
  var params = {};
  var baseUrl = '';
  var serviceBaseUrl = '';

  this.config = function(config) {
    params = angular.copy(config);
    baseUrl = params.baseUrl || baseUrl;
    delete params.baseUrl;
  };

  this.$get = function($resource) {
    // Allowed operations
    var actions = {
      remove: {
        url: baseUrl + serviceBaseUrl + ':businessId',
        method: 'DELETE'
      }
    };
    return $resource(baseUrl + serviceBaseUrl, null, actions);
  };
};

module.exports = {
  // TODO: ------- La siguiente linea es necesaria? -------
  //angular.module('app.component.services', []),
  //.factory('fooService', require('./fooService'));
  createBusiness: createBusiness,
  getBusiness: getBusiness,
  saveBusiness: saveBusiness,
  deleteBusiness: deleteBusiness
};
