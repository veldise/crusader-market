/**
*
*/
(function (angular, _) {
    'use strict';
    /**
    *
    */
    function config ($routeProvider, $logProvider) {
        $routeProvider
            // platform
            // .when('/platform/dashboard', {
            //     templateUrl: '/partials/platform/dashboard/index.html'
            // })
            .when('/hero', {
                controller: 'HeroCtrl',
                templateUrl: '/public/hero_table.html'
            })
            .when('/skill', {
                controller: 'SkillCtrl',
                templateUrl: '/public/hero_skill.html'
            })
            .when('/bread', {
                controller: 'BreadCalcCtrl',
                templateUrl: '/public/bread_calc.html'
            })
            // otherwise redirect
            .otherwise({
                redirectTo: '/hero'
            });

        // disable debug level messages
        $logProvider.debugEnabled(false);
    }
    config.$inject = ['$routeProvider', '$logProvider'];
    /**
    *
    */
    function MainCtrl ($scope, $modal) {
        /**
        *   shared
        */
        $scope.shared = {
            party: []
        };
        /**
        *
        */
        $scope.showDesc = true;

        $scope.deselectAll = function () {
            $scope.shared.party = [];
            $scope.$broadcast('deselectAll');
        };
        /**
        *
        */
        $scope.openDiff = function (heros) {
            var modalInstance = $modal.open({
                templateUrl: '/public/modal_diff.html',
                controller: 'ModalCtrl',
                size: 'lg',
                resolve: {
                    heros: function () {
                        return heros;
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
        $scope.$on('$routeChangeSuccess', function (scope, current/*, before*/) {
            if (!current || !current.$$route) {
                return;
            }

            $scope.currPath = current.$$route.originalPath;
        });
    }
    MainCtrl.$inject = ['$scope', '$modal'];
    /**
    *
    */
    angular.module('crusaderMarketApp', [
            'ngRoute',
            'smart-table',
            'ui.bootstrap',// 'ui-range-slider',
            'cm.controllers',
            'cm.modals'
        ])
        .config(config)
        .directive('boldKeyword', function () {
            return {
                restrict: 'A',
                scope: false,
                link: function (scope, element, attrs) {
                    var re = /(무속성 피해|물리 피해|마법 피해|\(\d+\/\d+\/\d+\)\%)/gim,
                        reText = '<span class="bold-text">$1</span>';

                    scope.$watch(attrs.boldKeyword, function (text) {
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
