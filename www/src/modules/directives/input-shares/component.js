'use strict';


function InputSharesCtrl() {
  var ctrl = this;

  ctrl.entity = ctrl.entity ? ctrl.entity : {};
  ctrl.entity = ctrl.entity || [];

  ctrl.newItem = {};

  ctrl.addItem = function(){
    ctrl.entity[ctrl.entity.length] = angular.extend({},ctrl.newItem);
    ctrl.newItem = {};
  };

  ctrl.removeItem = function(index){
    ctrl.entity.splice(index,1);
  };

}

InputSharesCtrl.$inject = [];

module.exports = {
  controller: InputSharesCtrl,
  bindings: {
    entity : "=",
    label : "@",
  },
  templateUrl: 'directives/input-shares/template.html'
};
