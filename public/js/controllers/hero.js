/**
*
*/
(function (angular, _) {
    'use strict';

    function HeroCtrl($scope, $compile, $templateCache) {
        /**
        *   Locals
        */
        var originData = [];

        $scope.$watch('shared.heros', function (heros) {
            if (!heros) {
                return;
            }
            originData = heros;

            // $scope.classTypes = _.uniq(_.pluck(heros, '클래스'));
            $scope.heros = heros;
        });
        /**
        *   func
        */
        $scope.filterHeros = function () {
            var currType = $scope.currType;
            var rst;

            // filter class type
            if (!currType || currType === '전체') {
                rst = originData;
            }
            else {
                rst = _.where(originData, { classType: $scope.currType });
            }

            // filter contract only or not
            var isContract = $scope.isContract;
            var isNoContract = $scope.isNoContract;
            if (isContract ^ isNoContract) { // xor
                if (!isContract) {
                    rst = _.filter(rst, function (hero) {
                        return !hero.isContract;
                    });
                }
                if (!isNoContract) {
                    rst = _.filter(rst, function (hero) {
                        return hero.isContract;
                    });
                }
            }

            $scope.heros = rst;
        };
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
            $scope.filterHeros();
        };
        $scope.selectType = function (type) {
            $scope.currType = type.heading;
            $scope.filterHeros();
        };
        /**
        *   Grid
        */
        $scope.heros = originData;

        $scope.$on('deselectAll', function () {
            _.each(originData, function (hero) {
                hero.isSelected = false;
            });
        });
        $scope.selectHero = function (hero) {
            // toggle
            hero.isSelected = !hero.isSelected;

            var party = $scope.shared.party;

            // select
            if (hero.isSelected) {
                party.push(hero);
                // only 3 heros
                if (party.length > 3) {
                    var shiftHero = party.shift();
                    shiftHero.isSelected = false;
                }
                // $scope.shared.party = sortPosition(party);
            }
            // deselect
            else {
                var idx = _.indexOf(party, hero);
                if (idx !== -1) {
                    // remove
                    party.splice(idx, 1);
                }
            }
        };

        $scope.toggleDesc = function (event, hero) {
            // enable xs screen
            var screenWidth = angular.element(document).width();
            if (screenWidth > 767) {
                return;
            }

            hero.isOpened = !hero.isOpened;

            var $target = angular.element(event.target);
            var $tr = $target.parents('tr');

            // create open row
            if (!$tr.next('.open-row').length) {
                var template = $templateCache.get('row_hero_desc');

                // var newScope = $scope.$new({});
                // newScope.hero = hero;
                $tr.after($compile(template)($tr.scope()));
            }
        };
    }
    HeroCtrl.$inject = ['$scope', '$compile', '$templateCache'];
    /**
    *
    */
    angular.module('cm.controllers')
        .controller('HeroCtrl', HeroCtrl);

})(angular, _);
