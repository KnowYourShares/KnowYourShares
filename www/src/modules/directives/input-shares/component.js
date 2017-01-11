'use strict';


function InputSharesCtrl($mdDialog) {
  var ctrl = this;

  ctrl.entity = ctrl.entity ? ctrl.entity : {};
  ctrl.entity = ctrl.entity || [];

  ctrl.newItem = {};

  ctrl.addItem = function(){
    mixpanel.track("user add new shareholder");
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
        .title('Some error in shares')
        .textContent('Sorry but the value has to be between 1-100')
        .ariaLabel('Maximum Shares Raised Dialog')
        .ok('Got it!')
      );
    }
  };

  ctrl.removeItem = function(index){
    mixpanel.track("user remove a shareholder");
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
