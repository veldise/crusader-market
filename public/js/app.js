/**
*
*/
(function (angular, _) {
    'use strict';
    /**
    *
    */
    function config ($logProvider) {
        // disable debug level messages
        $logProvider.debugEnabled(false);
    }
    config.$inject = ['$logProvider'];
    /**
    *
    */
    function MainCtrl($scope, $http) {
        /**
        *   Locals
        */
        var originData = [];

        function loadData () {
            $http.get('/warriors')
                .success(function (data) {
                    originData = data;

                    $scope.classTypes = _.uniq(_.pluck(data, '클래스'));
                    $scope.warriors = data;
                })
                .error(function (reason) {
                    console.error(reason);
                    alert(reason);
                });
        }
        // init
        loadData();
        /**
        *   party layer
        */
        $scope.party = [];

        function sortPosition (party) {
            var position = [];

            position.push(_.filter(party, function (warrior) {
                return (warrior['클래스'] === '워리어') || (warrior['클래스'] === '팔라딘');
            }));
            position.push(_.where(party, { '클래스': '프리스트' }));
            position.push(_.where(party, { '클래스': '아처' }));
            position.push(_.where(party, { '클래스': '헌터' }));
            position.push(_.where(party, { '클래스': '위자드' }));

            return _.flatten(position);
        }
        /**
        *   Tabset
        */
        $scope.classTypes = [
            '워리어', '팔라딘', '아처', '헌터', '위자드', '프리스트'
        ];
        $scope.currType = '전체';

        $scope.deselectType = function () {
            $scope.currType = '전체';
            $scope.warriors = originData;
        };
        $scope.selectType = function (type) {
            $scope.currType = type;
            $scope.warriors = _.where(originData, { '클래스': type });
        };
        /**
        *   Grid
        */
        $scope.warriors = originData;

        $scope.selectWarrior = function (warrior) {
            // toggle
            warrior.isSelected = !warrior.isSelected;

            var party = $scope.party;

            // select
            if (warrior.isSelected) {
                if (party.length >= 3) {
                    warrior.isSelected = false;
                    // alert
                    // ...
                }
                else {
                    party.push(warrior);
                    $scope.party = sortPosition(party);
                }
            }
            // deselect
            else {
                var idx = _.indexOf(party, warrior);
                if (idx !== -1) {
                    // remove
                    party.splice(idx, 1);
                }
            }
        };
    }
    MainCtrl.$inject = ['$scope', '$http'];
    /**
    *
    */
    angular.module('crusaderMarketApp', [])
        .config(config)
        .directive('boldKeyword', function () {
            return {
                restrict: 'A',
                scope: false,
                link: function (scope, element) {
                    var re = /(물리 피해|\d+-체인|SP)/gim;

                    var text = element.html();
                    var code = text.replace(/\{|\}/g, '');

                    scope.$watch(code, function (text) {
                        if (!text) {
                            return;
                        }

                        element.html(text.replace(re, '<span class="bold-text">$1</span>'));
                    });
                }
            };
        })
        .controller('MainCtrl', MainCtrl);
    /**
    *
    */
    angular.element(document).ready(function () {
        angular.bootstrap(document, [ 'crusaderMarketApp' ]);
    });
})(angular, _);
