/**
*
*/
(function (angular, _) {
    'use strict';

    function WarriorCtrl($scope, $http) {
        /**
        *   Locals
        */
        var originData = [];

        function loadData () {
            $http.get('/warriors')
                .success(function (data) {
                    originData = data;

                    // $scope.classTypes = _.uniq(_.pluck(data, '클래스'));
                    $scope.warriors = data;
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
            $scope.warriors = originData;
        };
        $scope.selectType = function (type) {
            $scope.currType = type.heading;
            $scope.warriors = _.where(originData, { '클래스': type.heading });
        };
        /**
        *   Grid
        */
        $scope.warriors = originData;

        $scope.$on('deselectAll', function () {
            _.each(originData, function (warrior) {
                warrior.isSelected = false;
            });
        });
        $scope.selectWarrior = function (warrior) {
            // toggle
            warrior.isSelected = !warrior.isSelected;

            var party = $scope.shared.party;

            // select
            if (warrior.isSelected) {
                if (party.length >= 3) {
                    warrior.isSelected = false;
                    // alert
                    // ...
                }
                else {
                    party.push(warrior);
                    // $scope.shared.party = sortPosition(party);
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
    WarriorCtrl.$inject = ['$scope', '$http'];
    /**
    *
    */
    angular.module('cm.controllers')
        .controller('WarriorCtrl', WarriorCtrl);

})(angular, _);
