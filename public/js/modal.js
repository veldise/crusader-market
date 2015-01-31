/**
*
*/
(function (angular, _) {
    'use strict';
    /**
    *
    */
    function ModalCtrl ($scope, $modalInstance, warriors) {
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
        // _.each(warriors, function (warrior) {
        //     var re = /\((\d+)\/(\d+)\/(\d+)\)\%/;
        //     var dems = warrior['블록 스킬'].match(re);
        //     if (dems) {
        //         warrior['1-체인'] = +dems[1];
        //         warrior['2-체인'] = +dems[2];
        //         warrior['3-체인'] = +dems[3];
        //     }
        // });

        var defKeys = [
                '등급',
                '클래스'
            ],
            statusKeys = [
                '공격력',
                '체력',
                '치명타 확률',
                '물리 방어력',
                '마법 저항력',
            ],
            // chainKeys = [
            //     '1-체인',
            //     '2-체인',
            //     '3-체인'
            // ],
            descKeys = [
                '블록 스킬',
                '패시브 타입',
                '패시브'
            ];

        $scope.names = _.pluck(warriors, '이름');
        $scope.defArr = _.map(defKeys, function (key) {
            var arr = _.pluck(warriors, key);
            arr.unshift(key);
            return arr;
        });
        $scope.statusArr = _.map(statusKeys, function (key) {
            var arr = _.pluck(warriors, key);
            arr.unshift(key);
            return arr;
        });
        // $scope.chainArr = _.map(chainKeys, function (key) {
        //     var arr = _.pluck(warriors, key);
        //     arr.unshift(key);
        //     return arr;
        // });
        $scope.descArr = _.map(descKeys, function (key) {
            var arr = _.pluck(warriors, key);
            arr.unshift(key);
            return arr;
        });

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
    };
    // ModalCtrl.$inject = ['$scope'];
    /**
    *
    */
    angular.module('cm.modalApp', [])
        .controller('ModalCtrl', ModalCtrl);
})(angular, _);

// /public/modal.html
