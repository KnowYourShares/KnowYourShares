'use strict';

module.exports = /*@ngInject*/
  function homeController($scope, $state, getBusiness) {

    $scope.getBusiness = getBusiness;

    $scope.businessKeys = {
      id: $state.params.id,
      password: $state.params.password
    };

    $scope.link = {};

    getBusiness.get($scope.businessKeys).$promise.then(function (response) {
      $scope.data = response.data;
      $scope.link.readOnly = !$scope.data.canEdit;
    }, function (err) {
      $state.go('app.home');
    });



  };
