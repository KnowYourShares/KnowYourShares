'use strict';

module.exports = /*@ngInject*/
  function homeController($scope, getBusiness, $rootScope, $state) {

    $scope.getBusiness = getObject;

    function getObject() {
      console.log('entro');
      getBusiness.get({businessId: $scope.code}).$promise.then(function (data) {
        $rootScope.data = data.data;
        $state.go('app.filters.location');
      });
    }

  };
