'use strict';

module.exports = /*@ngInject*/
  function homeController($scope, $state, createBusiness, getBusiness) {

    $scope.getBusiness = getObject;

    function getObject() {
      if($scope.code){
        return getBusiness.get({
          businessId: $scope.code
        }).$promise.then(function(response) {
          $state.go('app.filters.location', {id: $scope.code});
        },function () {
          //TODO IF WRONG PASSWORD
          //$scope.codeInput.codePass.$setValidity("incorrect", false);
          $scope.codeInput.codeNumber.$setValidity("notFound", false);
          console.log('ERROR 404');
        });
      }

      createBusiness.startBusiness({}).$promise.then(function(data) {
        $state.go('app.filters.location', {id: data._id, password: data.password});
      });
    }
  };
