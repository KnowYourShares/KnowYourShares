'use strict';

function resultsDirective(/* inject dependencies here, i.e. : $rootScope */) {
    return {
        restrict: 'E',
        bindToController: {},
        controller: resultsController,
        controllerAs: 'results',
        templateUrl: 'directives/filters-results/results.html'
    };
}

resultsController.$inject = [];
function resultsController() {
}

module.exports = resultsDirective;
