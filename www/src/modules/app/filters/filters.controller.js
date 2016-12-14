'use strict';

module.exports = /*@ngInject*/
  function filtersController($scope, $rootScope) {
    var data = {
      companyValue: 3000,
      founders: [],
      employees: [],
      rounds: []
    };
    //TODO Aquí estaría definido el objeto global con todos los datos,
    // de esta forma todos los filtros pueden acceder a ellos.
    initialize();

    function initialize() {
      if ($rootScope.data) {
        data = $rootScope.data;
      }

      $scope.data = data;

      console.log('filter controller : ', data);

      $scope.createRound = function () {
        console.log("createRound");
        var newRound = {};
        if (!data.rounds || !data.rounds.length) {
          newRound.name = "Round 0";
          newRound.preMoney = data.companyValue;
          newRound.moneyRaised = 1000000;
          newRound.postMoney = newRound.preMoney + newRound.moneyRaised;
          newRound.founders = data.founders;
          newRound.investors = data.investors;
          newRound.employees = data.employees;
          data.rounds = [];
        } else {
          var lastRound = data.rounds[data.rounds.length - 1];
          newRound.name = "Round " + data.rounds.length;
          newRound.preMoney = lastRound.postMoney;
          newRound.moneyRaised = 1000000;
          newRound.postMoney = newRound.preMoney + newRound.moneyRaised;
          newRound.founders = lastRound.founders;
          newRound.investors = lastRound.investors;
          newRound.employees = lastRound.employees;
        }
        data.rounds[data.rounds.length] = angular.copy(newRound);
      };

      $scope.removeRound = function (index) {
        if (data.rounds.length > 1) {
          data.rounds.splice(index, 1);
        }
      };

      $scope.selectedIndex = 0;
    }
  };
