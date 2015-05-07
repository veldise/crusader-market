/**
*
*/
define(function (require) {
    'use strict';

    // var angular = require('angular');
    var _ = require('lodash');
    /**
    *
    */
    HeroDiffCtrl.$inject = ['$scope', '$modalInstance', 'heros'];
    function HeroDiffCtrl ($scope, $modalInstance, heros) {
        /**
        *   Dialog
        */
        $scope.close = function () {
            $modalInstance.close();
        };
        // $scope.cancel = function () {
        //     $modalInstance.dismiss('cancel');
        // };

        /**
        *   Table
        */
        $scope.party = heros;
        $scope.indexes = _.range(heros.length);

        $scope.isMax = function (arr, item) {
            if (!arr || !arr.length) {
                return false;
            }

            arr = _.filter(arr, function (item) {
                return _.isNumber(item);
            });

            if (!_.isNumber(arr[0])) {
                return false;
            }
            if (allEqual(arr)) {
                return false;
            }

            var max = _.max(arr);
            return (max === item);
        };
        $scope.isMin = function (arr, item) {
            if (!arr || !arr.length) {
                return false;
            }

            arr = _.filter(arr, function (item) {
                return _.isNumber(item);
            });

            if (!_.isNumber(arr[0])) {
                return false;
            }
            if (allEqual(arr)) {
                return false;
            }

            var min = _.min(arr);
            return (min === item);
        };

        function allEqual (arr) {
            return (_.max(arr) === _.min(arr));
        }
        /**
        *
        */
        $scope.plusRatios = _.map(_.range(heros.length), function () {
            return 0;
        });
        $scope.status = {
            'AP': _.pluck(heros, 'AP'),
            'HP': _.pluck(heros, 'HP'),
            'critical': _.pluck(heros, 'critical'),
            'defense': _.pluck(heros, 'defense'),
            'resist': _.pluck(heros, 'resist')
        };

        $scope.resetStatus = function ($index) {
            $scope.plusRatios[$index] = 0;
            // reset status
            _.each($scope.status, function (arr, key) {
                arr[$index] = heros[$index][key];
            });
        };
        $scope.increaseStatus = function ($index, plusRatio) {
            if (plusRatio < 5) {
                plusRatio += 1;

                var status = $scope.status;
                _.each(status, function (arr, key) {
                    if (key === 'critical') {
                        return;
                    }

                    var originVal = heros[$index][key],
                        ratio = 1 + (plusRatio * 0.1);

                    status[key][$index] = Math.round(originVal * ratio);
                });

                $scope.plusRatios[$index] = plusRatio;
            }
        };
    }

    return HeroDiffCtrl;
});
