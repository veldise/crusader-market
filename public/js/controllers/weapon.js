/**
*
*/
define(function (require) {
    'use strict';

    var angular = require('angular');
    var _ = require('lodash');
    /**
    *
    */
    WeaponCtrl.$inject = ['$scope', '$http', '$compile', '$templateCache'];
    function WeaponCtrl($scope, $http, $compile, $templateCache) {
        /**
        *   Locals
        */
        var originData = [];
        var shared = $scope.shared; // from main

        if (!shared.weapons || !shared.weapons.length) {
            $http.get('/weapons')
                .success(function (data) {
                    data = _.filter(data, function (weapon) {
                        return weapon.name;
                    });

                    shared.weapons = data;
                    originData = data;
                    $scope.weapons = data;
                })
                .error(function (reason) { alert(reason); });
        }
        else {
            originData = shared.weapons;
            $scope.weapons = shared.weapons;
        }
        /**
        *   Tabset
        */
        $scope.classTypes = [
            { heading: '워리어', icon: 'img/icon/icon_warrior.png' },
            { heading: '팔라딘', icon: 'img/icon/icon_paladin.png' },
            { heading: '아처', icon: 'img/icon/icon_archer.png' },
            { heading: '헌터', icon: 'img/icon/icon_hunter.png' },
            { heading: '위자드', icon: 'img/icon/icon_wizard.png' },
            { heading: '프리스트', icon: 'img/icon/icon_priest.png' }
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

        $scope.convIconUrl = function (classType) {
            return {
                '검': 'img/icon/icon_warrior.png',
                '망치': 'img/icon/icon_paladin.png',
                '활': 'img/icon/icon_archer.png',
                '총': 'img/icon/icon_hunter.png',
                '지팡이': 'img/icon/icon_wizard.png',
                '보주': 'img/icon/icon_priest.png'
            }[classType];
        };

        $scope.toggleDesc = function (event, weapon) {
            // enable xs screen
            var screenWidth = angular.element(document).width();
            if (screenWidth > 767) {
                return;
            }

            weapon.isOpened = !weapon.isOpened;

            var $target = angular.element(event.target);
            var $tr = $target.parents('tr');

            // create open row
            if (!$tr.next('.open-row').length) {
                var template = $templateCache.get('row_weapon_desc');

                // var newScope = $scope.$new({});
                // newScope.weapon = weapon;
                $tr.after($compile(template)($tr.scope()));
            }
        };
    }

    return WeaponCtrl;
});
