'use strict';


function InputSharesCtrl($mdDialog) {
  var ctrl = this;

  ctrl.entity = ctrl.entity ? ctrl.entity : {};
  ctrl.entity = ctrl.entity || [];

  ctrl.newItem = {};

  ctrl.addItem = function(){
    if(ctrl.entity && ctrl.validateItem()) {
      ctrl.entity[ctrl.entity.length] = angular.extend({},ctrl.newItem);
      ctrl.total += ctrl.newItem.value;
      ctrl.newItem = {};
    }
    else{
      $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.querySelector('body')))
        .clickOutsideToClose(true)
        .title('Maximum Shares Raised')
        .textContent('Sorry but you are doing really god job, you raise 100% of shares')
        .ariaLabel('Maximum Shares Raised Dialog')
        .ok('Got it!')
      );
    }
  };

  ctrl.calculateRound = function () {
    console.log('calculate round');
    console.log($scope.data);
  }

  ctrl.removeItem = function(index){
    ctrl.total -= ctrl.entity[index].value;
    ctrl.entity.splice(index,1);
  };

  ctrl.validateItem = function() {
    if (ctrl.newItem.name === null || ctrl.newItem.name.toString() === "" ||
      ctrl.newItem.value === null || ctrl.newItem.value.undefined || ctrl.notFull()) {
      return false;
    }
    return true;
  };

  ctrl.notFull = function () {
    if((ctrl.total + ctrl.newItem.value) > 100) {
      return true;
    } else {
      return false;
    }
  };
}

InputSharesCtrl.$inject = ["$mdDialog"];

module.exports = {
  controller: InputSharesCtrl,
  bindings: {
    entity : "=",
    label : "@",
    total: "=ngModel"
  },
  templateUrl: 'directives/input-shares/template.html'
};
