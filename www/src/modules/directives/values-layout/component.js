'use strict';
function LayoutValuesCtrl($scope) {

  var ctrl = this;

  function calculate(shares, postmoney) {
    return (shares/100)*postmoney;
  }

  $scope.$watch("$ctrl.entity.founders", function () {
    ctrl.calculateValues();
  }, true);
  $scope.$watch("$ctrl.entity.investors", function () {
    ctrl.calculateValues();
  }, true);

  // TODO Obtener el postmoney calculado
  var postmoney = 1000;

  ctrl.calculateValues = function() {
    $scope.values = [];
    if (ctrl.entity.founders) {
      ctrl.entity.founders.forEach(function (o) {
        var valor = calculate(o.value,postmoney);
        $scope.values.push({name:o.name,shares:o.value,value:valor});
        //console.log($scope.values);
      });
    }
    if (ctrl.entity.investors) {
      ctrl.entity.investors.forEach(function (o) {
        var valor = calculate(o.value,postmoney);
        $scope.values.push({name:o.name,shares:o.value,value:valor});
        //console.log($scope.values);
      });
    }
  };

}

LayoutValuesCtrl.$inject = ["$scope"];

module.exports = /* @NgInject */
{
  controller: LayoutValuesCtrl,
  bindings: {
    entity: "="
  },
  templateUrl: 'directives/values-layout/template.html'
};
