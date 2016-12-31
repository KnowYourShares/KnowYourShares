'use strict';

module.exports = /*@ngInject*/
  function filtersController($scope, $rootScope, createBusiness, putBusiness, getBusiness, $state, $location, $mdToast, clipboard) {


    var data = {
      companyValue: 3000,
      founders: [],
      employees: [],
      investors: [],
      rounds: []
    };

    initialize();

    function initialize() {

      if($state.params.id !== "") {
        getBusiness.get({businessId: $state.params.id}).$promise.then(function (data) {
          $scope.data = data.data;
        });
      }

      $scope.data = data;
      $scope.host = 'localhost:8080/';
      $scope.businessPath = 'business/';

      $scope.createRound = function () {
        console.log('Create round');
        var newRound = {};
        if (!data.rounds || !data.rounds.length) {
          newRound.name = "Milestone 1";
          newRound.preMoney = data.companyValue;
          newRound.moneyRaised = 1000000;
          newRound.postMoney = newRound.preMoney + newRound.moneyRaised;
          newRound.founders = data.founders;
          newRound.investors = data.investors;
          newRound.employees = data.employees;
          data.rounds = [];
        } else {
          var lastRound = data.rounds[data.rounds.length - 1];
          newRound.name = "Milestone " + (data.rounds.length + 1);
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

      if (!clipboard.supported) {
          console.log('Sorry, copy to clipboard is not supported');
      }

      $scope.copyToClipboard = function () {

          var path = $scope.host + $scope.businessPath + $scope.data._id;
          if(!$scope.readOnly) {
            path += '/token';
          }
          clipboard.copyText(path);

          $mdToast.show($mdToast.simple().textContent('Link copied to clipboard!'));
      };

      $scope.save = function save() {
          if(!$scope.data._id){
              createBusiness.startBusiness($scope.data).$promise.then(function (data) {
                $scope.data = data;
                $mdToast.show($mdToast.simple().textContent('Changes saved'));
                $location.path('/business/' + data._id);
              });
          }
          else{
            putBusiness.save({businessId: $scope.data._id}, $scope.data).$promise.then(function (data) {
              $mdToast.show($mdToast.simple().textContent('Changes saved.'));
              $scope.data = data;
            });
          }
      };
    }
  };
