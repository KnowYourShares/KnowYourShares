'use strict';


function InputSharesCtrl() {
  var ctrl = this;

  ctrl.entity = ctrl.entity ? ctrl.entity : {};
  ctrl.entity[ctrl.field] = ctrl.entity[ctrl.field] || [];

  var data = ctrl.entity[ctrl.field];

  ctrl.newItem = {};

  ctrl.addItem = function(){
    data[data.length] = angular.extend({},ctrl.newItem);
    ctrl.newItem = {};
  };

  ctrl.removeItem = function(index){
    data.splice(index,1);
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
