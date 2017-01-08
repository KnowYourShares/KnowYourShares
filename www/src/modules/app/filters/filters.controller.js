'use strict';

module.exports = /*@ngInject*/
  function filtersController($scope, $rootScope, createBusiness, putBusiness, getBusiness, $state, $location, $mdToast, clipboard, $mdDialog, roundService) {
    function initialize() {
      $scope.link = {
        readOnly: true
      };

      $scope.businessKeys = {
        id: $state.params.id,
        password: $state.params.password
      };

      $scope.host = 'localhost:8080/';
      $scope.businessPath = 'business/';
      $scope.selectedIndex = 0;
      $scope.password = $state.params.password || '';

      getBusiness.get($scope.businessKeys).$promise.then(function(response) {
        $scope.data = response.data;
        $scope.link.readOnly = !$scope.data.canEdit;
        $scope.buildPath();
      }, function(err) {
        console.log('error ', err);
        $state.go('app.home');
      });

      if (!clipboard.supported) {
        console.log('Sorry, copy to clipboard is not supported');
      }

    }

    $scope.buildPath = function buildPath() {
      $scope.readOnlyPath = $scope.host + $scope.businessPath + $scope.data._id;
      $scope.editPath = $scope.readOnlyPath + '/' + $scope.password;
    };

    $scope.createRound = function() {
      $scope.data = roundService.createRound($scope.data);
      $scope.selectedIndex = $scope.data.rounds.length - 1;
    };

    $scope.removeRound = function(index) {
      $scope.data.rounds.splice(index, 1);
      $scope.selectedIndex = $scope.data.rounds.length - 1;
    };

    $scope.copyToClipboard = function() {
      clipboard.copyText($scope.link.readOnly ? $scope.readOnlyPath : $scope.editPath);
      $mdToast.show($mdToast.simple().textContent('Link copied to clipboard!'));
    };

    $scope.save = function save() {
      putBusiness.save($scope.businessKeys, $scope.data).$promise.then(function(data) {
        $mdToast.show($mdToast.simple().textContent('Changes saved.').position('top right'));
        $scope.data = data;
      }, function() {
        $mdToast.show($mdToast.simple().textContent('Error saving.').position('top right'));
      });
    };

    initialize();
  };
