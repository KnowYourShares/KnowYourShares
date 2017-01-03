'use strict';

module.exports = /*@ngInject*/
  function roundService(/* inject dependencies here, i.e. : $rootScope */) {
    var _createRound = function (data) {
      var newRound = {};
      if(data) {
        if (!data.rounds || !data.rounds.length) {
          newRound.name = "Event 1";
          newRound.preMoney = data.companyValue;
          newRound.moneyRaised = 1000000;
          newRound.postMoney = newRound.preMoney + newRound.moneyRaised;
          newRound.founders = data.founders;
          newRound.investors = data.investors;
          newRound.employees = data.employees;
          data.rounds = [];
        } else {
          var lastRound = data.rounds[data.rounds.length - 1];
          newRound.name = "Event " + (data.rounds.length + 1);
          newRound.preMoney = lastRound.postMoney;
          newRound.moneyRaised = 1000000;
          newRound.postMoney = newRound.preMoney + newRound.moneyRaised;
          newRound.founders = lastRound.founders;
          newRound.investors = lastRound.investors;
          newRound.employees = lastRound.employees;
        }
        data.rounds[data.rounds.length] = angular.copy(newRound);
      }
      return data;
    };
    return {
      createRound: _createRound
    };
  };
