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
    ctrl.round.moneyRaised = 0;
    ctrl.round.preMoney = 0;
    ctrl.round.postMoney = 0;
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

  ctrl.calculateRound = function () {
    mixpanel.track("user calculate the round value");
    console.log('calculate round', lastRound);
    //SharesPrevias * Pre-Money  = Valor Participación Actual
    //SharesActuales = Valor Participación Actual / PostMoney
    var investorsShares = 0;
    var investorsPrev = lastRound.investors;
    var bIds = {};
    if(ctrl.round.moneyRaised <= 0)
    {
      $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.querySelector('body')))
        .clickOutsideToClose(true)
        .title('Missing some values')
        .textContent('Sorry, money raised has to be great than 0 to calculate the round')
        .ariaLabel('No Money Raised Error')
        .ok('Got it!')
      );
    }
    else if(investorsPrev.length === ctrl.round.investors.length)
    {
      $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.querySelector('body')))
        .clickOutsideToClose(true)
        .title('Missing some values')
        .textContent("Sorry, you has to type some new investor in order to calculate the round")
        .ariaLabel('No New Investors Error')
        .ok('Got it!')
      );
    }
    else{

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
    }
  };
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
