'use strict';

module.exports = /*@ngInject*/
  function filtersController($scope) {
    var vm = this;
    //TODO Aquí estaría definido el objeto global con todos los datos,
    // de esta forma todos los filtros pueden acceder a ellos.

    var data = {
      companyValue: 1231231234,
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
      }]
    };

    $scope.data = data;

    console.log('filter controller : ', data);
  };
