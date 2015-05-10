/**
*
*/
define(function (require) {
    'use strict';

    var angular = require('angular');
    /**
    *
    */
    MainCtrl.$inject = ['$scope', '$http', '$document', '$window', '$location', '$modal'];
    function MainCtrl ($scope, $http, $document, $window, $location, $modal) {
        /**
        *   shared
        */
        $scope.shared = {
            party: [],
            heros: null,
            skills: null,
            weapons: null
        };
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
            /*var modalInstance = */$modal.open({
                templateUrl: '/public/hero_diff.html',
                controller: 'HeroDiffCtrl',
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
        $window.ga('send', 'pageview', { page: '/' });
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

            var path = $location.path();
            if (path[0] === '#') {
                path = path.slice(1);
            }
            if (path[0] !== '/') {
                path = '/' + path;
            }

            $window.ga('send', 'pageview', { page: path });
        });
    }

    return MainCtrl;
});
