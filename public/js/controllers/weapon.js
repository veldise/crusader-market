/**
*
*/
define([
    'angular', 'lodash'
], function (angular, _) {
    'use strict';

    function WeaponCtrl($scope, $compile, $templateCache) {
        /**
        *   Locals
        */
        var originData = [];

        $scope.$watch('shared.weapons', function (weapons) {
            if (!weapons) {
                return;
            }
            originData = weapons;

            // $scope.classTypes = _.uniq(_.pluck(weapons, '클래스'));
            $scope.weapons = weapons;
        });
        /**
        *   Tabset
        */
        $scope.classTypes = [
            { heading: '워리어', icon: 'img/icon_warrior.png' },
            { heading: '팔라딘', icon: 'img/icon_paladin.png' },
            { heading: '아처', icon: 'img/icon_archer.png' },
            { heading: '헌터', icon: 'img/icon_hunter.png' },
            { heading: '위자드', icon: 'img/icon_wizard.png' },
            { heading: '프리스트', icon: 'img/icon_priest.png' }
        ];
        $scope.currType = '전체';

        $scope.deselectType = function () {
            $scope.currType = '전체';
            $scope.filterWeapons();
        };
        $scope.selectType = function (type) {
            $scope.currType = {
                '워리어': '검',
                '팔라딘': '망치',
                '아처': '활',
                '헌터': '총',
                '위자드': '지팡이',
                '프리스트': '보주'
            }[type.heading];
            $scope.filterWeapons();
        };
        /**
        *   func
        */
        $scope.filterWeapons = function () {
            var currType = $scope.currType;
            var rst;

            // filter class type
            if (!currType || currType === '전체') {
                rst = originData;
            }
            else {
                rst = _.where(originData, { classType: $scope.currType });
            }

            $scope.weapons = rst;
        };
        /**
        *   Grid
        */
        $scope.weapons = originData;
    }
    WeaponCtrl.$inject = ['$scope', '$compile', '$templateCache'];

    return WeaponCtrl;
});
