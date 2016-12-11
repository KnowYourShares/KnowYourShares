'use strict';
function ChartSharesCtrl($scope) {


  function add (a,b) {
    return (a.value || 0) + (b.value || 0);
  }

  var ctrl = this;

  $scope.$watch("$ctrl.entity.founders", function () {
    console.log("ControllerAs founders"); // Triggers once on init
    mapValues(ctrl);
  },true);
  $scope.$watch("$ctrl.entity.employees", function () {
    console.log("ControllerAs employees"); // Triggers once on init
    mapValues(ctrl);
  },true);
  $scope.$watch("$ctrl.entity.investors", function () {
    console.log("ControllerAs investors"); // Triggers once on init
    mapValues(ctrl);
  },true);

  function mapValues(context){
    context.mappedData[0] = context.entity.founders.reduce(add,0) || 0;
    context.mappedData[1] = context.entity.investors.reduce(add,0) || 0;
    context.mappedData[2] = context.entity.employees.reduce(add,0) || 0;
  }

  ctrl.labels = ["Founders", "Investors", "Employees" ];

  ctrl.mappedData = [];
}

ChartSharesCtrl.$inject = ["$scope"];

module.exports = /* @NgInject */
  {
  controller: ChartSharesCtrl,
  bindings: {
    entity : "="
  },
  templateUrl: 'directives/chart-shares/template.html'
};
