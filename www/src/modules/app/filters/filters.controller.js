'use strict';

module.exports = /*@ngInject*/
  function filtersController($scope) {
    var vm = this;
    //TODO Aquí estaría definido el objeto global con todos los datos,
    // de esta forma todos los filtros pueden acceder a ellos.

    var data = {
      companyValue: 2000000,
      founders: [{
        name: "dani",
        value: 20
      },
        {
          name: "marcos",
          value: 20
        }],
      investors: [
        {
          name: "dani",
          value: 20
        },
        {
          name: "marcos",
          value: 20
        }
      ],
      employees: [{
        name: "dani",
        value: 20
      },
        {
          name: "marcos",
          value: 20
      }],
      rounds: [{
        name: "Round 0",
        preMoney: 2000000,
        moneyRaised: 1000000,
        postMoney: 3000000,
        founders: [{
          name: "dani",
          value: 30
        },
          {
            name: "marcos",
            value: 30
          }],
        investors: [
          {
            name: "dani",
            value: 30
          },
          {
            name: "marcos",
            value: 30
          }
        ],
        employees: [{
          name: "dani",
          value: 30
        },
          {
            name: "marcos",
            value: 30
        }]
      }]
    };

    $scope.data = data;

    console.log('filter controller : ', data);

    $scope.createRound = function(){
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
          var lastRound = data.rounds[data.rounds.length-1];
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

    $scope.removeRound = function(index){
      if(data.rounds.length > 1) {
        data.rounds.splice(index, 1);
      }
    };

    $scope.selectedIndex = 0;

  };
