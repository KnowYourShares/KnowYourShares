'use strict';

module.exports = /*@ngInject*/
  function roundService($mdDialog /* inject dependencies here, i.e. : $rootScope */) {
    var currentState;

    var _inputCurrentState = function (state) {
      console.log('input state:', state);
      currentState = state;
    };
    var _createRound = function (data) {
      currentState = data;
      var newRound = {};
      if(data) {
        if (!data.rounds || !data.rounds.length) {
          newRound.index = 0;
          newRound.name = "Initial State";
          newRound.preMoney = data.companyValue || 0;
          newRound.moneyRaised = 0;
          newRound.postMoney = newRound.preMoney + newRound.moneyRaised;
          newRound.founders = data.founders;
          newRound.investors = data.investors;
          newRound.employees = data.employees;
          data.rounds = [];
        } else {
          var lastRound = data.rounds[data.rounds.length - 1];
          var total = getSharesTotal(lastRound);
          if (total === 100) {
            newRound.index = data.rounds.length;
            newRound.name = "Event " + (data.rounds.length);
            newRound.preMoney = lastRound.postMoney;
            newRound.moneyRaised = 0;
            newRound.postMoney = newRound.preMoney + newRound.moneyRaised;
            newRound.founders = lastRound.founders;
            newRound.investors = lastRound.investors;
            newRound.employees = lastRound.employees;
          } else {
            newRound.index = lastRound.index;
            newRound.name = lastRound.name;
            newRound.preMoney = lastRound.preMoney || 0;
            newRound.moneyRaised = 0;
            newRound.postMoney = newRound.preMoney + newRound.moneyRaised;
            newRound.founders = lastRound.founders;
            newRound.investors = lastRound.investors;
            newRound.employees = lastRound.employees;

            data.rounds[lastRound.index] = angular.copy(newRound);

            if (total < 100) {
              showErrorSharesNotCompleted();
            } else {
              showErrorSharesExceeded();
            }

            return data;
          }
        }
        data.rounds[data.rounds.length] = angular.copy(newRound);
      }
      return data;
    };


    var getSharesTotal = function(lastRound) {
      var valuesInvestors = _.pluck(lastRound.investors,'value');
      var valuesFounders = _.pluck(lastRound.founders,'value');

      var totalInvestors = _.reduce(valuesInvestors,function(memo,num) {return memo+num;},0);
      var totalFounders = _.reduce(valuesFounders,function(memo,num) {return memo+num;},0);

      return totalInvestors+totalFounders;
    };

    var showErrorSharesNotCompleted = function() {
      $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element(document.querySelector('body')))
          .clickOutsideToClose(true)
          .title('Some error in shares.')
          .textContent('You must distribute all the shares.')
          .ariaLabel('Maximum Shares Dialog')
          .ok('Got it!')
      );
    };

    var showErrorSharesExceeded = function() {
      $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element(document.querySelector('body')))
          .clickOutsideToClose(true)
          .title('Some error in shares.')
          .textContent('Sorry but the total percentage can not exceed 100.')
          .ariaLabel('Maximum Shares Exceeded Dialog')
          .ok('Got it!')
      );
    };

    var _getCurrentState = function () {
      return currentState;
    };

    var _getLastRound = function (index) {
      console.log(index);
      if(index) {
        return currentState.rounds[index - 1];
      } else {
        return undefined;
      }
    };

    return {
      createRound: _createRound,
      getLastRound: _getLastRound,
      inputCurrentState: _inputCurrentState,
      getCurrentState: _getCurrentState
    };
  };
