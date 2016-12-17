'use strict';


function InputSharesCtrl($scope) {
  var ctrl = this;

  ctrl.entity = ctrl.entity ? ctrl.entity : {};
  ctrl.entity = ctrl.entity || [];

  ctrl.newItem = {};

  ctrl.addItem = function(isValid){
    if(ctrl.entity && isValid) {
      ctrl.newItem.auxname = ctrl.newItem.name;
      ctrl.newItem.auxvalue = ctrl.newItem.value;
      ctrl.entity[ctrl.entity.length] = angular.extend({},ctrl.newItem);
      ctrl.newItem = {};
      $scope.sharesInput.name.$setUntouched();
      $scope.sharesInput.value.$setUntouched();
    }
    else if (!isValid) {
      $scope.sharesInput.name.$setTouched();
      $scope.sharesInput.value.$setTouched();
    }
  };

  ctrl.removeItem = function(index){
    ctrl.entity.splice(index,1);
  };

  ctrl.updateName = function(index){
    if (ctrl.entity[index].name != ctrl.entity[index].auxname) {
      console.log("differente name " + index);
    }
    else {
      console.log("same name " + index);
    }
  };

  ctrl.updateValue = function(index){
    if (ctrl.entity[index].value != ctrl.entity[index].auxvalue) {
      console.log("different value " + index);
    }
    else {
      console.log("same value " + index);
    }
  };

}

InputSharesCtrl.$inject = ["$scope"];

module.exports = {
  controller: InputSharesCtrl,
  bindings: {
    entity : "=",
    label : "@"
  },
  templateUrl: 'directives/input-shares/template.html'
};
