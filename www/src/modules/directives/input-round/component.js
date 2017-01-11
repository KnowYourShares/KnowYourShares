'use strict';
function InputRoundCtrl($scope) {
  var ctrl = this;

  console.log("InputRoundCtrl");

  ctrl.round = ctrl.round ? ctrl.round : {};
  ctrl.round.founders = ctrl.round.founders || [];
  ctrl.round.investors = ctrl.round.investors || [];
  ctrl.round.employees = ctrl.round.employees || [];
  ctrl.total = 0;
  ctrl.showGraph = (ctrl.index === 0) ? 1 : 0;
  //Conseguir tener aqui previousInvestors y previousFounders

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
    var investorsShares = 0;

    /*var bIds = {};
    console.log(ctrl.round.investorsPrev);
    console.log(ctrl.round.investors);

    ctrl.round.investorsPrev.forEach(function(obj){
        bIds[obj.name] = obj;
    });

    var newInvestors = ctrl.round.investors.filter(function(obj){
      return !(obj.name in bIds);
    });
    */
    

    
    for(var i = 0; i < ctrl.round.investors.length; i++)
    {
      investorsShares = investorsShares + ctrl.round.investors[i].value;
    }
    ctrl.round.preMoney = ctrl.round.moneyRaised * investorsShares;
    ctrl.round.postMoney = ctrl.round.preMoney + ctrl.round.moneyRaised;
    for(var i = 0; i < ctrl.round.founders.length; i++)
    {
      var sharesFounder = ctrl.round.founders[i].value;
      var dilutedShares = Math.trunc( (sharesFounder*ctrl.round.preMoney) / ctrl.round.postMoney );
      ctrl.round.founders[i].value = dilutedShares;
    }
    /*for(var i = 0; i < ctrl.round.investorsPrev; i++)
    {
      var sharesInvestor = ctrl.round.investorsPrev[i].value;
      var nameInvestor = ctrl.round.investorsPrev[i].name;
      var dilutedShares = Math.trunc( (sharesInvestor*ctrl.round.preMoney) / ctrl.round.postMoney );
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
InputRoundCtrl.$inject = ['$scope'];

module.exports = {
  controller: InputRoundCtrl,
  bindings: {
    round : "=",
    index : "<"
  },
  templateUrl: 'directives/input-round/template.html'
};
