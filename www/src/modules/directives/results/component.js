'use strict';
function ResultsCtrl($scope) {

  console.log('this : ', this);

  //console.log('obj : ', this.entity.employees);

  console.log('leleleleleleleleele ');
  _.map(this.entity,function(o){
    console.log('object ', o);
  })
}

ResultsCtrl.$inject = ["$scope"];

module.exports = /* @NgInject */
  {
    controller: ResultsCtrl,
    bindings: {
      entity: "="
    },
    templateUrl: 'directives/results/template.html'
  };
