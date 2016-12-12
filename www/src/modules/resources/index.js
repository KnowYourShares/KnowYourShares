'use strict';

module.exports =
  angular.module('app.component.resources', [])
    .provider('createBusiness', require('./business-resource/business.resource').createBusiness)
    .provider('putBusiness', require('./business-resource/business.resource').putBusiness)
    .provider('deleteBusiness', require('./business-resource/business.resource').deleteBusiness)
    .provider('getBusiness', require('./business-resource/business.resource').getBusiness);


