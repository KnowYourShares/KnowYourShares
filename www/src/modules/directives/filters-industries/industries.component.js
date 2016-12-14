'use strict';

function industriesDirective(/* inject dependencies here, i.e. : $rootScope */) {
    return {
        restrict: 'E',
        bindToController: {},
        controller: industriesController,
        controllerAs: 'industries',
        templateUrl: 'directives/filters-industries/industries.html'
    };
}

industriesController.$inject = [];
function industriesController() {
}

module.exports = industriesDirective;
