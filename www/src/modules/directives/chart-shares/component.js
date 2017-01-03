'use strict';
function ChartSharesCtrl($scope) {


  function add(a, b) {
    return {value: (a.value || 0) + (b.value || 0)};
  }

  var ctrl = this;
  ctrl.group = true;


  $scope.$watch("$ctrl.entity.founders", function () {
    ctrl.mapValues();
  }, true);
  $scope.$watch("$ctrl.entity.employees", function () {
    ctrl.mapValues();
  }, true);
  $scope.$watch("$ctrl.entity.investors", function () {
    ctrl.mapValues();
  }, true);

  var calculateNotSet = function (ctrl) {
    var founders = ctrl.entity.founders.reduce(add, {value: 0}).value || 0;
    var inversors = ctrl.entity.investors.reduce(add, {value: 0}).value || 0;
    var employees = ctrl.entity.employees.reduce(add, {value: 0}).value || 0;
    return 100 - founders - inversors - employees;
  };

  ctrl.mapValues = function () {
    ctrl.labels = [];
    ctrl.mappedData = [];
    ctrl.notSetValue = 100;
    if (ctrl.group) {
      ctrl.labels = ["Founders", "Investors", "Employees", "Not set"];
      ctrl.mappedData[3] = 100;
      if (ctrl.entity.founders) {
        ctrl.mappedData[0] = ctrl.entity.founders.reduce(add, {value: 0}).value || 0;
        ctrl.mappedData[3] -= ctrl.mappedData[0];
      }
      if (ctrl.entity.investors) {
        ctrl.mappedData[1] = ctrl.entity.investors.reduce(add, {value: 0}).value || 0;
        ctrl.mappedData[3] -= ctrl.mappedData[1];
      }
      if (ctrl.entity.employees) {
        ctrl.mappedData[2] = ctrl.entity.employees.reduce(add, {value: 0}).value || 0;

      }
      ctrl.mappedData[3] = calculateNotSet(ctrl);
    } else {
      if (ctrl.entity.founders) {
        ctrl.entity.founders.forEach(function (o) {
          ctrl.labels.push(o.name);
          ctrl.mappedData.push(o.value);
        });
      }
      if (ctrl.entity.investors) {
        ctrl.entity.investors.forEach(function (o) {
          ctrl.labels.push(o.name);
          ctrl.mappedData.push(o.value);
        });
      }
      if (ctrl.entity.employees) {
        ctrl.entity.employees.forEach(function (o) {
          ctrl.labels.push(o.name);
          ctrl.mappedData.push(o.value);
        });
      }
      ctrl.labels.push('Not Set');
      ctrl.mappedData.push(calculateNotSet(ctrl));

    }
  };


  ctrl.mappedData = [];
}

ChartSharesCtrl.$inject = ["$scope"];

module.exports = /* @NgInject */
  {
    controller: ChartSharesCtrl,
    bindings: {
      entity: "="
    },
    templateUrl: 'directives/chart-shares/template.html'
  };
