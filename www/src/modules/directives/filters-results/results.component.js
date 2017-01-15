'use strict';

function resultsDirective(/* inject dependencies here, i.e. : $rootScope */) {
    return {
        restrict: 'E',
        scope: {
          entity: '='
        },
        bindToController: true,
        controller: resultsController,
        controllerAs: 'results',
        templateUrl: 'directives/filters-results/results.html'
    };
}

function resultsController() {
  console.log('WASAAP 1', this);
  console.log('WASAAP 2', this.entity);
}

module.exports = resultsDirective;
