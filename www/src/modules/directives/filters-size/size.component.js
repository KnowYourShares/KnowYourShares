'use strict';

function sizeDirective(/* inject dependencies here, i.e. : $rootScope */) {
  console.log('requiring size component');
  return {
        restrict: 'E',
        bindToController: {},
        controller: sizeController,
        controllerAs: 'size',
        templateUrl: 'directives/filters-size/size.html'
    };
}

sizeController.$inject = [];
function sizeController() {
}

module.exports = sizeDirective;
