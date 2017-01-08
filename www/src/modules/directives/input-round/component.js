'use strict';

function InputRoundCtrl($scope) {
  var ctrl = this;
  console.log("InputRoundCtrl");

  ctrl.round = ctrl.round ? ctrl.round : {};
  ctrl.round.founders = ctrl.round.founders || [];
  ctrl.round.investors = ctrl.round.investors || [];
  ctrl.round.employees = ctrl.round.employees || [];
  ctrl.total = 0;

  $scope.$watch('$ctrl.round.moneyRaised', function () {
    valoracionPremoney();
    valoracionPostmoney();
  });

  var valoracionPremoney = function () {
    ctrl.round.postMoney = ctrl.round.preMoney + ctrl.round.moneyRaised;
  };

  var valoracionPostmoney = function () {

  };

  ctrl.updateTotal = function(){
    console.log("updateTotal");
    ctrl.round.postMoney = ctrl.round.preMoney + ctrl.round.moneyRaised;
  };

  ctrl.modifyPostMoney = function(){
    console.log("postmoney");
    ctrl.round.moneyRaised = ctrl.round.postMoney - ctrl.round.preMoney;
  };

}

InputRoundCtrl.$inject = ['$scope'];

module.exports = {
  controller: InputRoundCtrl,
  bindings: {
    round : "=",
    index : "<"
  },
  templateUrl: 'directives/input-round/template.html'
};
