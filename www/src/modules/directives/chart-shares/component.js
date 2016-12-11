'use strict';
function ChartSharesCtrl($rootScope) {
  $rootScope.$emit("heu");

  this.$onInit = function() {
    this.mappedData[0] = this.entity.founders.reduce(add,0) || 0;
    this.mappedData[1] = this.entity.investors.reduce(add,0) || 0;
    this.mappedData[2] = this.entity.employees.reduce(add,0) || 0;
  };

  function add (a,b) {
    return (a.value || 0) + (b.value || 0);
  }

  var ctrl = this;

  $rootScope.$watch('')
  ctrl.labels = ["Founders", "Investors", "Employees" ];

  ctrl.mappedData = [];

}

ChartSharesCtrl.$inject = ["$rootScope"];

module.exports = /* @NgInject */
  {
  controller: ChartSharesCtrl,
  bindings: {
    entity : "="
  },
  templateUrl: 'directives/chart-shares/template.html'
};
