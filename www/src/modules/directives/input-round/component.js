'use strict';
function InputRoundCtrl($scope, roundService,$mdDialog) {
  var ctrl = this;

  console.log("InputRoundCtrl");

  ctrl.round = ctrl.round ? ctrl.round : {};
  ctrl.round.founders = ctrl.round.founders || [];
  ctrl.round.investors = ctrl.round.investors || [];
  ctrl.round.employees = ctrl.round.employees || [];
  ctrl.round.index = ctrl.round.index || 0;
  ctrl.total = 0;
  ctrl.showGraph = 1;

  var lastRound;

  $scope.$watch('$ctrl.round.index', function(newValue) {
    lastRound = roundService.getLastRound(newValue);
  });

  ctrl.updateTotal = function(){
    console.log("updateTotal");
    ctrl.round.postMoney = ctrl.round.preMoney + ctrl.round.moneyRaised;
  };

  ctrl.modifyPostMoney = function(){
    console.log("postmoney");
    ctrl.round.moneyRaised = ctrl.round.postMoney - ctrl.round.preMoney;
  };

  ctrl.resetRound = function(){
    mixpanel.track("user reset round event");
    for (var i = 0; i < lastRound.founders.length; i++) {
      var founderName = lastRound.founders[i].name;
      var f = 0;
      var found = ctrl.round.founders.some(function(item, index) {
       f = index; return item.name == founderName;
      });

      if (found) {
       ctrl.round.founders[f].value = lastRound.founders[i].value;
      }
    }

    for (var i = 0; i < lastRound.investors.length; i++) {
      var investorName = lastRound.investors[i].name;
      var f = 0;
      var found = ctrl.round.investors.some(function(item, index) {
       f = index; return item.name == investorName;
      });

      if (found) {
       ctrl.round.investors[f].value = lastRound.investors[i].value;
      }
    }

  }


}
InputRoundCtrl.$inject = ['$scope', 'roundService','$mdDialog'];

module.exports = {
  controller: InputRoundCtrl,
  bindings: {
    round : "=",
    indexRound : "<"
  },
  templateUrl: 'directives/input-round/template.html'
};
