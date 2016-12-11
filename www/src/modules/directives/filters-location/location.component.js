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

locationController.$inject = [];
function locationController() {

}

module.exports = locationDirective;
