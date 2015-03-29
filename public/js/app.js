/**
*
*/
(function (angular, _) {
    'use strict';
    /**
    *
    */
    function fnConfig ($routeProvider, $logProvider) {
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
    fnConfig.$inject = ['$routeProvider', '$logProvider'];
    /**
    *
    */
    function fnRun ($templateCache, $http) {
        $http.get('public/partials/row_skill_desc.html')
            .success(function (data) {
                $templateCache.put('row_skill_desc', data);
            })
            .error(function (reason) { alert(reason); });
        $http.get('public/partials/row_hero_desc.html')
            .success(function (data) {
                $templateCache.put('row_hero_desc', data);
            })
            .error(function (reason) { alert(reason); });
    }
    fnRun.$inject = ['$templateCache', '$http'];
    /**
    *
    */
    function MainCtrl ($scope, $http, $document, $modal) {
        /**
        *   shared
        */
        $scope.shared = {
            party: [],
            heros: null,
            skills: null
        };

        function loadData () {
            $http.get('/heros')
                .success(function (data) { $scope.shared.heros = data; })
                .error(function (reason) { alert(reason); });
            $http.get('/skills')
                .success(function (data) { $scope.shared.skills = data; })
                .error(function (reason) { alert(reason); });
        }
        /**
        *   init
        */
        loadData();
        /**
        *   navbar hide
        */
        $document.on('click', function (e) {
            var $target = angular.element(e.target),
                $navToggle = angular.element('.navbar-toggle'),
                $navCollapse = angular.element('.navbar-collapse');

            var isNavbar = $target.is('.navbar') || $target.parents().is('.navbar');
            if (!isNavbar && $navCollapse.hasClass('in')) {
                $navToggle.addClass('collapsed');
                $navCollapse.removeClass('in').css('height', '0');
            }
        });
        /**
        *   navbar form
        */
        $scope.showDesc = true;

        $scope.deselectAll = function () {
            $scope.shared.party = [];
            $scope.$broadcast('deselectAll');
        };

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
        *   route
        */
        $scope.$on('$routeChangeSuccess', function (scope, current/*, before*/) {
            if (!current || !current.$$route) {
                return;
            }

            $scope.currPath = current.$$route.originalPath;

            // hide navbar
            var $navToggle = angular.element('.navbar-toggle'),
                $navCollapse = angular.element('.navbar-collapse');

            if ($navCollapse.hasClass('in')) {
                $navToggle.addClass('collapsed');
                $navCollapse.removeClass('in').css('height', '0');
            }
        });
    }
    MainCtrl.$inject = ['$scope', '$http', '$document', '$modal'];
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
        .config(fnConfig)
        .run(fnRun)
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
