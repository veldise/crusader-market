/**
*
*/
define(function (require) {
    'use strict';

    // var angular = require('angular');
    // var _ = require('lodash');
    /**
    *
    */
    function BreadCalcCtrl ($scope) {
        /**
        *   locals
        */
        var breadNums = [0, 100, 700, 2100, 5000, 10600];
        /**
        *
        */
        $scope.minRank = 0;
        $scope.maxRank = 1;
        $scope.maxBread = 100;

        // $scope.currBread = 0;
        // $scope.addedBread = 0;
        $scope.rstAddBread = 0;

        $scope.isSuccess = true;

        $scope.selectRank = function (min, max) {
            var sumMin = 0;
            for (var i=0; i<=min; i++) {
                sumMin += breadNums[i];
            }
            var sumMax = 0;
            for (var j=0; j<=max; j++) {
                sumMax += breadNums[j];
            }

            $scope.maxBread = sumMax - sumMin;
        };
        /**
        *   watch
        */
        $scope.$watch('minRank', function () {
            $scope.selectRank($scope.minRank, $scope.maxRank);
        });
        $scope.$watch('maxRank', function () {
            $scope.selectRank($scope.minRank, $scope.maxRank);
        });

        $scope.$watch('currBread', function () {
            $scope.calcBread($scope.currBread, $scope.addedBread, $scope.maxBread);
        });
        $scope.$watch('addedBread', function () {
            $scope.calcBread($scope.currBread, $scope.addedBread, $scope.maxBread);
        });
        $scope.$watch('maxBread', function () {
            $scope.calcBread($scope.currBread, $scope.addedBread, $scope.maxBread);
        });
        $scope.$watch('isSuccess', function () {
            $scope.calcBread($scope.currBread, $scope.addedBread, $scope.maxBread);
        });

        $scope.calcBread = function (curr, added, max) {
            curr = curr || 0;
            // curr : 현재 훈련치
            // added : 빵 선택 후 훈련치
            var currPer = curr / max * 100;
            currPer = Math.max(0, Math.min(100, currPer));

            // add: 빵 선택으로 추가되는 훈련치
            var add = Math.max(0, added - curr);
            // 대성공시 1.5배
            if ($scope.isSuccess) {
                add = Math.floor(add * 1.5);
            }
            var addPer = add / max * 100;
            addPer = Math.max(0, Math.min(100 - currPer, addPer));

            $scope.rstAddBread = add || 0;
            $scope.currPer = currPer;
            $scope.addPer = addPer;
        };
        $scope.calcAutoBread = function (curr, max) {
            curr = curr || 0;

            var add = max - curr,
                added = add;
            // 대성공시 1.5배
            if ($scope.isSuccess) {
                added = Math.ceil(add / 1.5);
            }

            $scope.addedBread = curr + added;
        };
        $scope.resetBread = function () {
            $scope.currBread = undefined;
            $scope.addedBread = undefined;
        };
    }
    BreadCalcCtrl.$inject = ['$scope'];

    return BreadCalcCtrl;
});
