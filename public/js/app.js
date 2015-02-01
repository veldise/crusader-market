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
    function MainCtrl($scope, $http, $timeout, $modal) {
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

        $scope.rmParty = function (index) {
            if ($scope.party[index]) {
                $scope.party[index].isSelected = false;
                $scope.party.splice(index, 1);
            }
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

        $scope.deselectAll = function () {
            _.each(originData, function (warrior) {
                warrior.isSelected = false;
            });
            $scope.party = [];
        };
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
        /**
        *
        */
        $scope.openDiff = function (warriors) {
            var modalInstance = $modal.open({
                templateUrl: '/public/modal.html',
                controller: 'ModalCtrl',
                size: 'lg',
                resolve: {
                    warriors: function () {
                        return warriors;
                    }
                }
            });

            // modalInstance.result.then(function (selectedItem) {
            //     $scope.selected = selectedItem;
            // }, function () {
            //     $log.info('Modal dismissed at: ' + new Date());
            // });
        };
        /**
        *
        */
        $scope.openCalc = function () {
            var modalInstance = $modal.open({
                templateUrl: '/public/modal_calc.html',
                controller: 'ModalCalcCtrl',
                // size: 'sm',
                resolve: {}
            });
        };
    }
    MainCtrl.$inject = ['$scope', '$http', '$timeout', '$modal'];
    /**
    *
    */
    angular.module('crusaderMarketApp', [
            'ui.bootstrap',
            'cm.modalApp'
        ])
        .config(config)
        .directive('boldKeyword', function () {
            return {
                restrict: 'A',
                scope: false,
                link: function (scope, element) {
                    var re = /(물리 피해|마법 피해|\d+-체인|SP|\(\d+\/\d+\/\d+\)\%)/gim,
                        reText = '<span class="bold-text">$1</span>';

                    var text = element.html();
                    var code = text.replace(/\{|\}/g, '');

                    scope.$watch(code, function (text) {
                        if (!text) {
                            element.html('');
                            return;
                        }

                        element.html(text.replace(re, reText));
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
