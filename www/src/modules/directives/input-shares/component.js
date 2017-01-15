'use strict';


function InputSharesCtrl($mdDialog,roundService,$scope) {
  var ctrl = this;

  ctrl.entity = ctrl.entity || [];
  ctrl.type = ctrl.type || "";
  ctrl.round = ctrl.round || {};
  ctrl.round.founders = ctrl.round.founders || [];
  ctrl.round.investors = ctrl.round.investors || [];
  ctrl.round.employees = ctrl.round.employees || [];
  ctrl.round.index = ctrl.round.index || 0;
  ctrl.newItem = {};

  var lastRound;

  $scope.$watch('$ctrl.round.index', function(newValue) {
    lastRound = roundService.getLastRound(newValue);
  });

  ctrl.changeTotal = function (item, oldvalue) {
    var total = 0;
    console.log("totalSumFounders: ", ctrl.round.founders);
    console.log("totalSumInvestors: ", ctrl.round.investors);
    total += ctrl.round.founders.totalSumByField("value");
    total += ctrl.round.investors.totalSumByField("value");
    console.log("totalSumFounders2: ", ctrl.round.founders);
    console.log("totalSumInvestors2: ", ctrl.round.investors);
    if(ctrl.total > 100) {
      item.value = oldvalue;
      ctrl.showErrorMaxShares();
    }
  };

  ctrl.addToListIfValidationOK = function () {
    if (ctrl.entity && ctrl.validateItem()) {
      ctrl.addToList();
    } else {
      ctrl.showErrorShares();
    }
  };

  ctrl.addToList = function() {
    ctrl.entity[ctrl.entity.length] = angular.extend({}, ctrl.newItem);
    ctrl.total += ctrl.newItem.value;
    ctrl.newItem = {};
  };

  ctrl.addItem = function(){
    mixpanel.track("user add new shareholder");
    // Initial State
    if (!lastRound) {
      // Adding founder
      if (ctrl.type === 'founder') {
        // If not exists
        if (!ctrl.founderNameExists()) {
          // & Validate is OK
          ctrl.addToListIfValidationOK();
        } else {
          ctrl.showErrorFounderNameExists();
        }
      }
      else if (ctrl.type === 'investor') {
        // If investor, validate & add
        ctrl.addToListIfValidationOK();
      }
    } // In events
    else {
      if (ctrl.type === 'founder') {
        if (!ctrl.founderNameExists()) {
          ctrl.addToListIfValidationOK();
        } else {
          ctrl.showErrorFounderNameExists();
        }
      } else if (ctrl.type === 'investor') {
        if (ctrl.entity && ctrl.validateItem()) {
          if (ctrl.round.moneyRaised > 0) {
            ctrl.addToList();
            ctrl.calculateRound();
          } else {
            ctrl.showErrorMoneyRaised();
          }
        } else {
          ctrl.showErrorShares();
        }
      }
    }
  };

  ctrl.showErrorMaxShares = function() {
    $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.querySelector('body')))
        .clickOutsideToClose(true)
        .title('Some error in shares')
        .textContent('Sorry but the total percentage can not exceed 100')
        .ariaLabel('Maximum Shares Raised Dialog')
        .ok('Got it!')
    );
  };

  ctrl.showErrorShares = function() {
    $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.querySelector('body')))
        .clickOutsideToClose(true)
        .title('Some error in shares')
        .textContent('Sorry but the value has to be between 1-100 and all the fields must be filled')
        .ariaLabel('Maximum Shares Raised Dialog')
        .ok('Got it!')
    );
  };

  ctrl.showErrorMoneyRaised = function() {
    $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.querySelector('body')))
        .clickOutsideToClose(true)
        .title('Missing some values')
        .textContent('Sorry, money raised has to be great than 0 to calculate the round')
        .ariaLabel('No Money Raised Error')
        .ok('Got it!')
    );
  };

  ctrl.showErrorNewInvestor = function() {
    $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.querySelector('body')))
        .clickOutsideToClose(true)
        .title('Missing some values')
        .textContent("Sorry, you has to type some new investor in order to calculate the round")
        .ariaLabel('No New Investors Error')
        .ok('Got it!')
    );
  };

  ctrl.showErrorFounderNameExists = function () {
    $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.querySelector('body')))
        .clickOutsideToClose(true)
        .title('Error with founders name')
        .textContent("Sorry, there can't be two founders with the same name.")
        .ariaLabel('Founders name exists')
        .ok('Got it!')
    );
  };

  ctrl.removeItem = function(index){
    mixpanel.track("user remove a shareholder");
    console.log('remove round actual', ctrl.round);
    var lastValue = (ctrl.entity[index].value || 0);
    ctrl.total -= lastValue;
    ctrl.entity.splice(index,1);
    ctrl.calculateRound(true, lastValue);
  };

  ctrl.validateItem = function() {
    return !(!ctrl.newItem.name || !ctrl.newItem.value);
  };

  ctrl.Full = function () {
    return ((ctrl.total + ctrl.newItem.value) > 100);
  };

  ctrl.founderNameExists = function () {
    var newName = ctrl.newItem.name;
    var names = _.pluck(ctrl.round.founders, 'name');
    return _.contains(names,newName);
  };

  ctrl.calculateRound = function (isDelete, lastValue) {
    if(lastRound && ctrl.type === 'investor')
    {
      mixpanel.track("user calculate the round value");
      console.log('calculate round last', lastRound);
      console.log('calculate round actual', ctrl.round);
      //SharesPrevias * Pre-Money  = Valor Participación Actual
      //SharesActuales = Valor Participación Actual / PostMoney
      var investorsShares = 0;
      var investorsPrev = lastRound.investors;
      var foundersPrev = lastRound.founders;
      var bIds = {};
      if(ctrl.round.moneyRaised <= 0)
      {
        ctrl.showErrorMoneyRaised();
      }
      else if(!isDelete && investorsPrev.length === ctrl.round.investors.length)
      {
        ctrl.showErrorNewInvestor();
      }
      else if (isDelete) {
        var people = ctrl.round.investors.length + ctrl.round.founders.length;
        if (people) {
          var toShare = lastValue / people;
          ctrl.round.investors.forEach(function(obj){obj.value += toShare});
          ctrl.round.founders.forEach(function(obj){obj.value += toShare});
        }
      }
      else{

        investorsPrev.forEach(function(obj){
            bIds[obj.name] = obj;
        });

        var newInvestors = ctrl.round.investors.filter(function(obj){
          return !(bIds.hasOwnProperty(obj.name));
        });
        console.log("totalSumnewInvestors: ", newInvestors);
        investorsShares = newInvestors.totalSumByField("value");
        console.log("totalSumnewInvestors2: ", newInvestors);

        var howMany = 100/investorsShares;
        console.log("investorsShares: ", investorsShares);
        ctrl.round.postMoney = ctrl.round.moneyRaised * howMany;
        ctrl.round.preMoney = ctrl.round.postMoney - ctrl.round.moneyRaised;
        console.log("ctrl.round.preMoney: ", ctrl.round.preMoney);
        console.log("ctrl.round.postMoney: ", ctrl.round.postMoney);

        _.map(foundersPrev, function(previousFounder){
          var sharesFounder = previousFounder.value;
          var founderName = previousFounder.name;
          var actualValuation = sharesFounder * ctrl.round.preMoney;
          var dilutedShares = actualValuation / ctrl.round.postMoney;
          console.log("actualValuationFounder: ", actualValuation);
          console.log("dilutedSharesFounder: ", dilutedShares);
          var currentFounder = _.find(ctrl.round.founders, function(founder) {
            if(founder.hasOwnProperty('name') && founderName === founder.name) {
              return founder;
            }
          });
          if (currentFounder) {
            currentFounder.value = dilutedShares;
            currentFounder.prevvalue = sharesFounder;
          }
        });

        _.map(investorsPrev, function(previousInvestor){
          var sharesInvestor = previousInvestor.value;
          var investorName = previousInvestor.name;
          var actualValuation = sharesInvestor * ctrl.round.preMoney;
          var dilutedShares = actualValuation / ctrl.round.postMoney;
          console.log("actualValuationInvestor: ", actualValuation);
          console.log("dilutedSharesInvestor: ", dilutedShares);
          var currentInvestor = _.find(ctrl.round.investors, function(investor) {
            if(investor.hasOwnProperty('name') && investorName === investor.name) {
              return investor;
            }
          });
          if (currentInvestor) {
            currentInvestor.value = dilutedShares;
            currentInvestor.prevvalue = sharesInvestor;
          }
        });
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
