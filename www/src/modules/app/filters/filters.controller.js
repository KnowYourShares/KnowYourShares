'use strict';

module.exports = /*@ngInject*/
  function filtersController($scope, $rootScope, createBusiness, putBusiness, Business) {
    //TODO Killian

    var data = {
      companyValue: 3000,
      founders: [],
      employees: [],
      investors: [],
      rounds: []
    };

    initialize();

    function initialize() {
      if(Business){
        Business.then(
          function(data) {
            data = data.data;
          });
      }

      console.log('Business ' + Business);

      $scope.data = data;

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

      $scope.save = function save() {
          //Tener en cuenta si se está editando o bien es la primera vez que se crea.
          if(!$scope.data._id){
              // console.log('create');
              createBusiness.startBusiness($scope.data).$promise.then(function (data) {
                $scope.data = data;
              });
          }
          else{
            // console.log('update');
            putBusiness.save($scope.data).$promise.then(function (data) {
              // console.log('data is ', data);
              $scope.data = data;
            });
          }
      };
    }
  };
