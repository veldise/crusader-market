/**
*
*/
(function (angular, _) {
    'use strict';
    /**
    *
    */
    function ModalCalcCtrl ($scope, $modalInstance) {
        /**
        *   Dialog
        */
        $scope.close = function () {
            $modalInstance.close();
        };
        /**
        *
        */
        $scope.currRank = 0;
        $scope.maxBread = 100;

        // $scope.currBread = 0;
        // $scope.addBread = 0;
        $scope.rstAddBread = 0;

        $scope.isSuccess = true;

        $scope.selectRank = function (rank) {
            $scope.currRank = rank;

            switch (rank) {
                case 0: $scope.maxBread = 100; break;
                case 1: $scope.maxBread = 700; break;
                case 2: $scope.maxBread = 2100; break;
                case 3: $scope.maxBread = 5000; break;
                case 4: $scope.maxBread = 10600; break;
            }
        };
        /**
        *   watch
        */
        $scope.$watch('currBread', function () {
            $scope.calcBread($scope.currBread, $scope.addBread, $scope.maxBread);
        });
        $scope.$watch('addBread', function () {
            $scope.calcBread($scope.currBread, $scope.addBread, $scope.maxBread);
        });
        $scope.$watch('maxBread', function () {
            $scope.calcBread($scope.currBread, $scope.addBread, $scope.maxBread);
        });
        $scope.$watch('isSuccess', function () {
            $scope.calcBread($scope.currBread, $scope.addBread, $scope.maxBread);
        });

        $scope.calcBread = function (curr, add, max) {
            var currPer = curr / max * 100;
            currPer = Math.max(0, Math.min(100, currPer));

            if ($scope.isSuccess) {
                add = Math.round(add * 1.5);
            }
            var addPer = add / max * 100;
            addPer = Math.max(0, Math.min(100 - currPer, addPer));

            $scope.rstAddBread = add || 0;
            $scope.currPer = currPer;
            $scope.addPer = addPer;
        };
        $scope.resetBread = function () {
            $scope.currBread = undefined;
            $scope.addBread = undefined;
        };
    }
    ModalCalcCtrl.$inject = ['$scope', '$modalInstance'];
    /**
    *
    */
    angular.module('cm.modalApp')
        .controller('ModalCalcCtrl', ModalCalcCtrl);
})(angular, _);

// /public/modal.html
