'use strict';

function ageDirective(/* inject dependencies here, i.e. : $rootScope */) {
    return {
        restrict: 'E',
        bindToController: {},
        controller: ageController,
        controllerAs: 'functions',
        templateUrl: 'directives/filters-age/age.html'
    };
}

ageController.$inject = [];
function ageController() {
}

module.exports = ageDirective;