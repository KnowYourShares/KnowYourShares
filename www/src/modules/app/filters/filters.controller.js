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
        name: "Round 1",
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
  };
