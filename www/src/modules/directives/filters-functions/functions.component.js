'use strict';

function functionsDirective(/* inject dependencies here, i.e. : $rootScope */) {
    return {
        restrict: 'E',
        bindToController: {},
        controller: functionsController,
        controllerAs: 'functions',
        templateUrl: 'directives/filters-functions/functions.html'
    };
}

functionsController.$inject = [];
function functionsController() {
}

module.exports = functionsDirective;