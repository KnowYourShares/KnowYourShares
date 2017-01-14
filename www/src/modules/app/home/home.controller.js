'use strict';

module.exports = /*@ngInject*/
  function homeController($scope, $state, createBusiness, getBusiness) {

    $scope.getBusiness = getObject;

    function getObject(withCode) {
      if (withCode) {
        $scope.codeInput.$setSubmitted();
        if(!$scope.code) {
          $scope.codeInput.codeNumber.$setValidity("required",false);
          $scope.codeInput.codeNumber.$setValidity("notFound",true);
        }
        else {
          $scope.codeInput.codeNumber.$setValidity("required",true);
          $scope.codeInput.codeNumber.$setValidity("notFound",true);
          var obj = {
            id: $scope.code,
            password: $scope.password
          };
          console.log('object ', obj);
          return getBusiness.get(obj).$promise.then(
            function(response) {
              $state.go('app.filters.location', obj);
            },
            function() {
              $scope.codeInput.codeNumber.$setValidity("notFound", false);
              console.log('ERROR 404');
            });
        }
      }
      else {
        createBusiness.startBusiness({}).$promise.then(function(data) {
          $state.go('app.filters.location', {
            id: data._id,
            password: data.password
          });
        });
      }
    }
  };
