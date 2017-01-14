'use strict';


function InputSharesCtrl($mdDialog,roundService,$scope) {
  var ctrl = this;

  ctrl.entity = ctrl.entity ? ctrl.entity : {};
  ctrl.entity = ctrl.entity || [];
  ctrl.type = ctrl.type || "";
  ctrl.round = ctrl.round ? ctrl.round : {};
  ctrl.round.founders = ctrl.round.founders || [];
  ctrl.round.investors = ctrl.round.investors || [];
  ctrl.round.employees = ctrl.round.employees || [];
  ctrl.round.index = ctrl.round.index || 0;
  ctrl.newItem = {};

  var lastRound;

  $scope.$watch('$ctrl.round.index', function(newValue) {
    lastRound = roundService.getLastRound(newValue);
  });

  ctrl.addItem = function(){
    mixpanel.track("user add new shareholder");
    if(ctrl.entity && ctrl.validateItem()) {
      ctrl.entity[ctrl.entity.length] = angular.extend({},ctrl.newItem);
      ctrl.total += ctrl.newItem.value;
      ctrl.newItem = {};
    }
    else{
      $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.querySelector('body')))
        .clickOutsideToClose(true)
        .title('Some error in shares')
        .textContent('Sorry but the value has to be between 1-100')
        .ariaLabel('Maximum Shares Raised Dialog')
        .ok('Got it!')
      );
    }
  };

  ctrl.removeItem = function(index){
    mixpanel.track("user remove a shareholder");
    ctrl.total -= ctrl.entity[index].value;
    ctrl.entity.splice(index,1);
  };

  ctrl.validateItem = function() {
    console.log(ctrl.newItem.value);
    if (ctrl.newItem.name === null || ctrl.newItem.name.toString() === "" ||
      ctrl.newItem.value === null || !ctrl.newItem.value || ctrl.Full()) {
      return false;
    }
    return true;
  };

  ctrl.Full = function () {
    if((ctrl.total + ctrl.newItem.value) > 100) {
      return true;
    } else {
      return false;
    }
  };

  ctrl.calculateRound = function () {
    if(typeof lastRound !=='undefined' && typeof ctrl.type !== 'undefined' && ctrl.type === 'investor')
    {
      mixpanel.track("user calculate the round value");
      console.log('calculate round', lastRound);
      //SharesPrevias * Pre-Money  = Valor Participación Actual
      //SharesActuales = Valor Participación Actual / PostMoney
      var investorsShares = 0;
      var investorsPrev = lastRound.investors;
      var foundersPrev = lastRound.founders;
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
        ctrl.round.postMoney = ctrl.round.moneyRaised * howMany;
        ctrl.round.preMoney = ctrl.round.postMoney - ctrl.round.moneyRaised;
        for(var j = 0; j < foundersPrev.length; j++)
        {
          var sharesFounder = foundersPrev[j].value;
          var founderName = foundersPrev[j].name;
          var actualValuation = sharesFounder * ctrl.round.preMoney;
          var dilutedShares = actualValuation / ctrl.round.postMoney;
          var f = 0;
          var found = ctrl.round.founders.some(function(item, index) {
           f = index; return item.name == founderName;
          });

          if (found) {
           ctrl.round.founders[f].value = dilutedShares;
           ctrl.round.founders[f].prevvalue = sharesFounder;
          }
        }
        /*for(var j = 0; j < ctrl.round.investors.length; j++)
        {
          var sharesInvestor = ctrl.round.investors[j].value;
          var actualValuation = sharesInvestor * ctrl.round.preMoney;
          var dilutedShares = actualValuation / ctrl.round.postMoney;
          ctrl.round.investors[j].value = dilutedShares;
        }*/
        for(var t = 0; t < investorsPrev.length; t++)
        {
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
           ctrl.round.investors[f].prevvalue = sharesInvestor;
          }

        }
      }
    }
  };
}

InputSharesCtrl.$inject = ["$mdDialog","roundService","$scope"];

module.exports = {
  controller: InputSharesCtrl,
  bindings: {
    entity : "=",
    type : "@",
    label : "@",
    round : "=",
    indexRound : "<",
    total: "=ngModel"
  },
  templateUrl: 'directives/input-shares/template.html'
};
