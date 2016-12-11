'use strict';


function InputSharesCtrl() {
  var ctrl = this;

  ctrl.entity = ctrl.entity ? ctrl.entity : {};
  ctrl.entity[ctrl.field] = ctrl.entity[ctrl.field] || [];

  ctrl.newItem = {};

  ctrl.addItem = function(){
    ctrl.entity[ctrl.field][ctrl.entity[ctrl.field].length] = angular.extend({},ctrl.newItem);
    ctrl.newItem = {};
  };

  ctrl.removeItem = function(index){
    ctrl.entity[ctrl.field].splice(index,1);
  };

}

InputSharesCtrl.$inject = [];

module.exports = {
  controller: InputSharesCtrl,
  bindings: {
    entity : "=",
    label : "@",
    field: "@"
  },
  templateUrl: 'directives/input-shares/template.html'
};
