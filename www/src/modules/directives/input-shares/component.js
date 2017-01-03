'use strict';


function InputSharesCtrl() {
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
  };

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

InputSharesCtrl.$inject = [];

module.exports = {
  controller: InputSharesCtrl,
  bindings: {
    entity : "=",
    label : "@",
    total: "=ngModel"
  },
  templateUrl: 'directives/input-shares/template.html'
};
