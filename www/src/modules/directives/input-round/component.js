'use strict';
function InputRoundCtrl($scope, roundService) {
  var ctrl = this;

  console.log("InputRoundCtrl");

  ctrl.round = ctrl.round ? ctrl.round : {};
  ctrl.round.founders = ctrl.round.founders || [];
  ctrl.round.investors = ctrl.round.investors || [];
  ctrl.round.employees = ctrl.round.employees || [];
  ctrl.total = 0;
  ctrl.showGraph = (ctrl.index === 0) ? 1 : 0;


  var lastRound = roundService.getLastRound(); //<-- aqui tienes la ultima ronda, si es la primera sera undefined
  console.log(lastRound);


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

  ctrl.calculateRound = function () {
    mixpanel.track("user calculate the round value");
    console.log('calculate round');
    //SharesPrevias * Pre-Money  = Valor Participación Actual
    //SharesActuales = Valor Participación Actual / PostMoney
    var investorsShares = 0;
    var investorsPrev = lastRound.investors;
    var bIds = {};

    investorsPrev.forEach(function(obj){
        bIds[obj.name] = obj;
    });

    var newInvestors = ctrl.round.investors.filter(function(obj){
      return !(obj.name in bIds);
    });
    


    for(var i = 0; i < newInvestors.length; i++)
    {
      investorsShares = investorsShares + newInvestors[i].value;
    }
    var howMany = 100/investorsShares;
    ctrl.round.preMoney = ctrl.round.moneyRaised * howMany;
    ctrl.round.postMoney = ctrl.round.preMoney + ctrl.round.moneyRaised;
    for(var j = 0; j < ctrl.round.founders.length; j++)
    {
      var sharesFounder = ctrl.round.founders[j].value;
      var actualValuation = sharesFounder * ctrl.round.preMoney;
      var dilutedShares = actualValuation / ctrl.round.postMoney;
      ctrl.round.founders[j].value = dilutedShares;
    }
    for(var j = 0; j < ctrl.round.investors.length; j++)
    {
      var sharesInvestor = ctrl.round.investors[j].value;
      var actualValuation = sharesInvestor * ctrl.round.preMoney;
      var dilutedShares = actualValuation / ctrl.round.postMoney;
      ctrl.round.investors[j].value = dilutedShares;
    }
    /*for(var t = 0; t < investorsPrev.length; t++)
    {
      console.log(investorsPrev[t]);
      var sharesInvestor = investorsPrev[t].value;
      var nameInvestor = investorsPrev[t].name;
      var actualValuation = sharesInvestor * ctrl.round.preMoney;
      var dilutedShares = actualValuation / ctrl.round.postMoney;
      //getIndex of investor
      var f = 0;
      var found = ctrl.round.investors.some(function(item, index) {
       f = index; return item.name == nameInvestor;
      });

      if (found) {
       ctrl.round.investors[f].value = dilutedShares;
      }

    }*/
  };
}
InputRoundCtrl.$inject = ['$scope', 'roundService'];

module.exports = {
  controller: InputRoundCtrl,
  bindings: {
    round : "=",
    index : "<"
  },
  templateUrl: 'directives/input-round/template.html'
};
