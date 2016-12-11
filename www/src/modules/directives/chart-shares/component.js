'use strict';
function ChartSharesCtrl($scope) {


  function add (a,b) {
    return {value : (a.value || 0) + (b.value || 0)};
  }

  var ctrl = this;
  ctrl.group = true;


  $scope.$watch("$ctrl.entity.founders", function () {
    ctrl.mapValues();
  },true);
  $scope.$watch("$ctrl.entity.employees", function () {
    ctrl.mapValues();
  },true);
  $scope.$watch("$ctrl.entity.investors", function () {
    ctrl.mapValues();
  },true);

  ctrl.mapValues = function (){
    ctrl.labels = [];
    ctrl.mappedData = [];
    if(ctrl.group){
      ctrl.labels = ["Founders", "Investors", "Employees" ];
      ctrl.mappedData[0] = ctrl.entity.founders.reduce(add,{value:0}).value || 0;
      ctrl.mappedData[1] = ctrl.entity.investors.reduce(add,{value:0}).value || 0;
      ctrl.mappedData[2] = ctrl.entity.employees.reduce(add,{value:0}).value || 0;
    }else{
      ctrl.entity.founders.forEach(function(o){
        ctrl.labels.push(o.name);
        ctrl.mappedData.push(o.value);
      });
      ctrl.entity.investors.forEach(function(o){
        ctrl.labels.push(o.name);
        ctrl.mappedData.push(o.value);
      });
      ctrl.entity.employees.forEach(function(o){
        ctrl.labels.push(o.name);
        ctrl.mappedData.push(o.value);
      });

    }
  }


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
