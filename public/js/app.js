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
            .when('/warrior', {
                controller: 'WarriorCtrl',
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
                redirectTo: 'warrior'
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

        $scope.deselectAll = function () {
            $scope.shared.party = [];
            $scope.$broadcast('deselectAll');
        };
        /**
        *
        */
        $scope.openDiff = function (warriors) {
            var modalInstance = $modal.open({
                templateUrl: '/public/modal_diff.html',
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
        $scope.$on('$routeChangeSuccess', function (scope, current/*, before*/) {
            if (!current || !current.$$route) {
                return;
            }

            $scope.currPath = current.$$route.originalPath;
            // close navbar
            // angular.element('.navbar-toggle').trigger('click');
        });
    }
    MainCtrl.$inject = ['$scope', '$modal'];
    /**
    *
    */
    angular.module('crusaderMarketApp', [
            'ngRoute',
            'ui.bootstrap',
            'cm.controllers',
            'cm.modals'
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
