'use strict';

function locationDirective() {
    return {
        restrict: 'E',
        bindToController: {},
        controller: locationController,
        controllerAs: 'location',
        templateUrl: 'directives/filters-location/location.html'
    };
}

locationController.$inject = ['$scope'];
function locationController($scope) {
  $scope.total = 0;
  $scope.$watch($scope.total, function () {
    console.log($scope.total);
  });
}

module.exports = locationDirective;
