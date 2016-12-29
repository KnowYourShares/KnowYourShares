'use strict';

module.exports = /*@ngInject*/
  function homeController($scope, getBusiness, $rootScope, $state) {

    $scope.getBusiness = getObject;

    function getObject() {

      if(!$scope.code){
        return $state.go('app.filters.location');
      }

      getBusiness.get({businessId: $scope.code}).$promise.then(function (data) {
        $rootScope.data = data.data;
        $state.go('app.filters.location');
      });
    }

  };
