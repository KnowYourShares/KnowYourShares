'use strict';
function ChartSharesCtrl($scope) {


  function add (a,b) {
    return {value : (a.value || 0) + (b.value || 0)};
  }

  var ctrl = this;

  $scope.$watch("$ctrl.entity.founders", function () {
    mapValues(ctrl);
  },true);
  $scope.$watch("$ctrl.entity.employees", function () {
    mapValues(ctrl);
  },true);
  $scope.$watch("$ctrl.entity.investors", function () {
    mapValues(ctrl);
  },true);

  function mapValues(context){
    context.mappedData[0] = context.entity.founders.reduce(add,{value:0}).value || 0;
    context.mappedData[1] = context.entity.investors.reduce(add,{value:0}).value || 0;
    context.mappedData[2] = context.entity.employees.reduce(add,{value:0}).value || 0;
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
