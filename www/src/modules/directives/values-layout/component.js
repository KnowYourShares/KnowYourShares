'use strict';
function LayoutValuesCtrl($scope,roundService) {

  var ctrl = this;

  initialize();

  function initialize() {
    ctrl.entity = roundService.getCurrentState();
    console.log('entro entity', ctrl.entity);
  }

  function calculate(shares, postmoney) {
    return (shares/100)*postmoney;
  }

  $scope.$watch("$ctrl.entity.founders", function () {
    ctrl.calculateValues();
  }, true);
  $scope.$watch("$ctrl.entity.investors", function () {
    ctrl.calculateValues();
  }, true);

  ctrl.calculateValues = function() {
    console.log("table calculateValues entity: ", ctrl.entity);
    $scope.values = [];
    if (ctrl.entity.founders) {
      ctrl.entity.founders.forEach(function (o) {
        var valor = calculate(o.value,ctrl.entity.postMoney);
        $scope.values.push({name:o.name,shares:o.value,value:valor});
        //console.log($scope.values);
      });
    }
    if (ctrl.entity.investors) {
      ctrl.entity.investors.forEach(function (o) {
        var valor = calculate(o.value,ctrl.entity.postMoney);
        $scope.values.push({name:o.name,shares:o.value,value:valor});
        //console.log($scope.values);
      });
    }
  };

}

LayoutValuesCtrl.$inject = ['$scope', 'roundService'];

module.exports = /* @NgInject */
{
  controller: LayoutValuesCtrl,
  bindings: {
    entity: "="
  },
  templateUrl: 'directives/values-layout/template.html'
};
