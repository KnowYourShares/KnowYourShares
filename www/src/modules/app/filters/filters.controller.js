'use strict';

module.exports = /*@ngInject*/
  function filtersController($scope, $rootScope, createBusiness, putBusiness, getBusiness, $state, $location, $mdToast, clipboard, $mdDialog) {

    function initialize() {
      getBusiness.get({
        businessId : $state.params.id,
        password : $state.params.password
      }).$promise.then(function(response) {
        $scope.data = response.data;
        $scope.buildPath();
      },function(err){
        console.log('error ', err);
        $state.go('app.home');
      });

      $scope.host = 'localhost:8080/';
      $scope.businessPath = 'business/';
      $scope.selectedIndex = 0;
      $scope.password = $state.params.password;

      if (!clipboard.supported) {
        console.log('Sorry, copy to clipboard is not supported');
      }
    }

    $scope.buildPath = function buildPath() {
      $scope.readOnlyPath = $scope.host + $scope.businessPath + $scope.data._id;
      $scope.editPath =  $scope.readOnlyPath + '/' + ($scope.password || 'testPassword');
    };

    $scope.createRound = function() {
      var newRound = {};
      if (!$scope.data.rounds || !$scope.data.rounds.length) {
        newRound.name = "Milestone 1";
        newRound.preMoney = $scope.data.companyValue;
        newRound.moneyRaised = 1000000;
        newRound.postMoney = newRound.preMoney + newRound.moneyRaised;
        newRound.founders = $scope.data.founders;
        newRound.investors = $scope.data.investors;
        newRound.employees = $scope.data.employees;
        $scope.data.rounds = [];
      } else {
        var lastRound = $scope.data.rounds[$scope.data.rounds.length - 1];
        newRound.name = "Milestone " + ($scope.data.rounds.length + 1);
        newRound.preMoney = lastRound.postMoney;
        newRound.moneyRaised = 1000000;
        newRound.postMoney = newRound.preMoney + newRound.moneyRaised;
        newRound.founders = lastRound.founders;
        newRound.investors = lastRound.investors;
        newRound.employees = lastRound.employees;
      }
      $scope.data.rounds[$scope.data.rounds.length] = angular.copy(newRound);
    };

    $scope.removeRound = function(index) {
        $scope.data.rounds.splice(index, 1);
    };

    $scope.copyToClipboard = function() {
      clipboard.copyText($scope.readOnly ? $scope.readOnlyPath : $scope.editPath);
      $mdToast.show($mdToast.simple().textContent('Link copied to clipboard!'));
    };

    $scope.save = function save() {
        putBusiness.save({
          businessId: $scope.data._id
        }, $scope.data).$promise.then(function(data) {
          $mdToast.show($mdToast.simple().textContent('Changes saved.'));
          $scope.data = data;
        },function() {
          $mdToast.show($mdToast.simple().textContent('Error saving.'));
        });
    };

    initialize();
  };
