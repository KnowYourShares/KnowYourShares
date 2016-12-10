'use strict';

module.exports = /*@ngInject*/
    function filtersController($scope) {
        var vm = this;
        //TODO Aquí estaría definido el objeto global con todos los datos,
        // de esta forma todos los filtros pueden acceder a ellos.

        var data = ["hue","hue","hue","hue","hue","hue"]
        $scope.data = data;

        console.log('filter controller : ', data);
    };
