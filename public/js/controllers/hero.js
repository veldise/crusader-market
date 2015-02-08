/**
*
*/
(function (angular, _) {
    'use strict';

    function HeroCtrl($scope, $http, $compile) {
        /**
        *   Locals
        */
        var originData = [];

        function loadData () {
            $http.get('/heros')
                .success(function (data) {
                    originData = data;

                    // $scope.classTypes = _.uniq(_.pluck(data, '클래스'));
                    $scope.heros = data;
                })
                .error(function (reason) {
                    alert(reason);
                });
        }
        // init
        loadData();
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
            $scope.heros = originData;
        };
        $scope.selectType = function (type) {
            $scope.currType = type.heading;
            $scope.heros = _.where(originData, { classType: type.heading });
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
                if (party.length >= 3) {
                    hero.isSelected = false;
                    // alert
                    // ...
                }
                else {
                    party.push(hero);
                    // $scope.shared.party = sortPosition(party);
                }
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
                var template = [
                    '<tr class="open-row hidden-md hidden-sm" ng-show="hero.isOpened">',
                        '{{hero}}<td class="ac va_m well" style="padding:4px">',
                            '<img class="img-thum" ng-src="{{hero.block_thum}}"/>',
                        '</td>',
                        '<td colspan="5" class="well">',
                            '<h5><b>{{hero.block_name}}</b></h4>',
                            '<h5 bold-keyword="hero.block_desc"></h5>',
                            '<div>',
                                '<h5 style="display:inline">패시브</h5>',
                                '<h5 style="display:inline" bold-keyword="hero.passive_desc"></h5>',
                            '</div>',
                        '</td>',
                    '</tr>'
                ].join('');

                var newScope = $scope.$new({});
                newScope.hero = hero;

                $tr.after($compile(template)(newScope));
            }
        };
    }
    HeroCtrl.$inject = ['$scope', '$http', '$compile'];
    /**
    *
    */
    angular.module('cm.controllers')
        .controller('HeroCtrl', HeroCtrl);

})(angular, _);
