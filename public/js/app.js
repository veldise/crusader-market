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
                return (warrior.w_class === '워리어') || (warrior.w_class === '팔라딘');
            }));
            position.push(_.where(party, { w_class: '프리스트' }));
            position.push(_.where(party, { w_class: '아쳐' }));
            position.push(_.where(party, { w_class: '헌터' }));
            position.push(_.where(party, { w_class: '위자드' }));

            return _.flatten(position);
        }
        /**
        *   Tabset
        */
        $scope.classTypes = [
            '워리어', '팔라딘', '아쳐', '헌터', '위자드', '프리스트'
        ];
        $scope.currType = '전체';

        $scope.deselectType = function () {
            $scope.currType = '전체';
            $scope.warriors = originData;
        };
        $scope.selectType = function (type) {
            $scope.currType = type;
            $scope.warriors = _.where(originData, { w_class: type });
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
        .controller('MainCtrl', MainCtrl);
    /**
    *
    */
    angular.element(document).ready(function () {
        angular.bootstrap(document, [ 'crusaderMarketApp' ]);
    });
})(angular, _);
