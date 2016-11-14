'use strict';

function locationDirective(/* inject dependencies here, i.e. : $rootScope */) {
    return {
        restrict: 'E',
        bindToController: {},
        controller: locationController,
        controllerAs: 'location',
        templateUrl: 'directives/filters-location/location.html'
    };
}

locationController.$inject = [];
function locationController() {
}

module.exports = locationDirective;