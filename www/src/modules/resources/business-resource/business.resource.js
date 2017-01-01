'use strict';

var createBusiness = function() {
  // Configuration and default parameters
  var params = {};
  var baseUrl = '';
  var serviceBaseUrl = '/rest/business/';

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

var putBusiness = function() {
  // Configuration and default parameters
  var params = {};
  var baseUrl = '';
  var serviceBaseUrl = '/rest/business/';

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
  var serviceBaseUrl = '/rest/business/';

  this.config = function(config) {
    params = angular.copy(config);
    baseUrl = params.baseUrl || baseUrl;
    delete params.baseUrl;
  };

  this.$get = function($resource) {
    // Allowed operations
    var actions = {
      get: {
        url: baseUrl + serviceBaseUrl + ':businessId' + '/:password' ,
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
  var serviceBaseUrl = '/rest/business/';

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
  createBusiness: createBusiness,
  getBusiness: getBusiness,
  putBusiness: putBusiness,
  deleteBusiness: deleteBusiness
};
