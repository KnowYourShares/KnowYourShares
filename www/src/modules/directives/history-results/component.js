'use strict';
function HistoryResultsCtrl() {
  var ctrl = this;

  console.log(this);

  console.log("HistoryResultsCtrl");
  console.log(this.history);
  console.log("laberl" + this.label);

  this.mappedData = [{
      label: 'Founder1',
      data: [12, 19, 3, 17, 6, 3, 7],
    }, {
      label: 'Founder2',
      data: [2, 29, 5, 5, 2, 3, 10],
    }];

  this.labels = ['Round8', 'Round2', 'Round3', 'Round4', 'Round5', 'Round6', 'Round7'];

}
HistoryResultsCtrl.$inject = [];

module.exports = {
  controller: HistoryResultsCtrl,
  bindings: {
    history : "=",
    label : "@"
  },
  templateUrl: 'directives/history-results/template.html'
};
