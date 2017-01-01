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
          //TODO ADD ERROR TO FORM
          console.log('ERROR 404');
        });
      }

      createBusiness.startBusiness({}).$promise.then(function(data) {
        $state.go('app.filters.location', {id: data._id, password: data.password});
      });
    }
  };
