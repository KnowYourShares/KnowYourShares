'use strict';

module.exports = /*@ngInject*/
  function homeController($scope, getBusiness, $rootScope, $state) {

    $scope.getBusiness = getObject;

    function getObject() {
      $state.go('app.filters.location', {id: $scope.code});
    }

  };
