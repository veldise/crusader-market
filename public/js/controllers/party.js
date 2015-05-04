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
    function PartyCtrl($scope) {
        /**
        *   party layer
        */
        $scope.party = [];

        /*
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
        */

        $scope.rmParty = function (index) {
            if ($scope.party[index]) {
                $scope.party[index].isSelected = false;
                $scope.party.splice(index, 1);
            }
        };
    }
    PartyCtrl.$inject = ['$scope'];

    return PartyCtrl;
});
