'use strict';

module.exports = /*@ngInject*/
    function resultsController($scope, $state, getBusiness, roundService, $timeout) {
        /*
        * Helper functions
        */
        function getRoundValues (round) {
            return _.map(round,function(people){
                return people.value;
            })
        }
        function getRoundLabels(rounds) {
            return _.pluck(rounds, 'name');
        }

        function sum(a, b) { return a + b }

        $scope.businessKeys = {
            id: $state.params.id,
            password: $state.params.password
        };

        $scope.goToFilters = function () {
            $state.go('app.filters.location', $scope.businessKeys);
        };

        getBusiness.get($scope.businessKeys).$promise.then(function (response) {
            $scope.data = response.data;

            doLineChart('#preMoneyChartLine', true);
            doLineChart('#postMoneyChartLine', false);

            doPieChart('#totalPieChartGrouped', true);
            doPieChart('#totalPieChartUngrouped', false);

            doBarChart('#preMoneyChartBar', false);
            doBarChart('#postMoneyChartBar', false);
        }, function (err) {
            console.log('error ', err);
            $state.go('app.home');
        });



        function getFinalRoundPie(grouped) {

            var finalRound = $scope.data.rounds[$scope.data.rounds.length - 1];

            var hash = {};
            if(grouped){
                var founders = finalRound.founders;
                var investors = finalRound.investors;
                hash.labels = ['Founders','Investors'];
                hash.series = [
                    _.pluck(founders,'value').reduce(sum),
                    _.pluck(investors,'value').reduce(sum)
                ];
            }
            else{
                var allPeople = finalRound.founders.concat(finalRound.investors);
                hash.labels = getRoundLabels(allPeople);
                hash.series = getRoundValues(allPeople);
            }
            return hash;
        }

        function doPieChart(selector, group) {

            var data = getFinalRoundPie(group);

            function pieChartInterpolationFunc (label, index) {
                return label + ' : ' + data.series[index]+ 'k';
            }

            var options = {
                labelInterpolationFnc: pieChartInterpolationFunc
            };

            new Chartist.Pie(selector, data, options);
        }


        function getAllRoundSeries(rounds, byPremoney) {
            var hash = {};
            _.map(rounds, function (round) {
                var roundValuation = byPremoney ? round.preMoney : round.postMoney;
                var allPeopleInRound = round.founders.concat(round.investors);
                _.map(allPeopleInRound, function(people){
                    var roundValueForPeople = {
                        meta : people.name,
                        value : people.value * roundValuation / 100
                    };
                    if(hash.hasOwnProperty(people.name)){
                        hash[people.name].values.push(roundValueForPeople);
                    }else{
                        hash[people.name] = {
                            name: people.name,
                            values : [roundValueForPeople]
                        }
                    }
                });
            });
            return _.pluck(hash, 'values');
        }

        function doBarChart(selector, byPremoney ,labels, series){
            labels = labels || getRoundLabels($scope.data.rounds);
            series = series || getAllRoundSeries($scope.data.rounds, byPremoney);

            var data = {
                labels: labels,
                series: series
            };

            var options = {
                plugins: [
                    Chartist.plugins.tooltip()
                ],
                seriesBarDistance: 15
            };

            var responsiveOptions = [
                ['screen and (min-width: 641px) and (max-width: 1024px)', {
                    seriesBarDistance: 10,
                    axisX: {
                        labelInterpolationFnc: function (value) {
                            return value;
                        }
                    }
                }],
                ['screen and (max-width: 640px)', {
                    seriesBarDistance: 5,
                    axisX: {
                        labelInterpolationFnc: function (value) {
                            return value[0];
                        }
                    }
                }]
            ];
            new Chartist.Bar(selector, data, options, responsiveOptions);
        }

        function doLineChart(selector, byPremoney, labels, series) {
            // Our labels and three data series
            console.log('Suppp');
            labels = labels || getRoundLabels($scope.data.rounds);
            series = series || getAllRoundSeries($scope.data.rounds, byPremoney);

            console.log('LINE SERIES ', series);

            var data = {
                labels: labels,
                series: series
            };

            // We are setting a few options for our chart and override the defaults
            var options = {
                plugins: [
                    Chartist.plugins.tooltip()
                ],
                // Don't draw the line chart points
                showPoint: true,
                // Disable line smoothing
                lineSmooth: false,
                // X-Axis specific configuration
                axisX: {
                    // We can disable the grid for this axis
                    showGrid: true,
                    // and also don't show the label
                    showLabel: true
                },
                // Y-Axis specific configuration
                axisY: {
                    // Lets offset the chart a bit from the labels
                    offset: 60,
                    // The label interpolation function enables you to modify the values
                    // used for the labels on each axis. Here we are converting the
                    // values into million pound.
                    labelInterpolationFnc: function (value) {
                        return value + 'k';
                    }
                }
            };
            // All you need to do is pass your configuration as third parameter to the chart function
            new Chartist.Line(selector, data, options);
        }
    };
