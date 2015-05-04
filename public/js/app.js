/**
*
*/
define(function (require, exports) {
    'use strict';

    var angular = require('angular');
    // var _ = require('lodash');

    require('angular-route');

    require('bootstrap');
    require('ui-bootstrap');
    require('smart-table');

    require('./controllers/app.js');
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
            .when('/weapon', {
                controller: 'WeaponCtrl',
                templateUrl: '/public/hero_weapon.html'
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
        // pre-load partials template
        $http.get('public/partials/row_skill_desc.html')
            .success(function (data) { $templateCache.put('row_skill_desc', data); })
            .error(function (reason) { alert(reason); });
        $http.get('public/partials/row_hero_desc.html')
            .success(function (data) { $templateCache.put('row_hero_desc', data); })
            .error(function (reason) { alert(reason); });
        $http.get('public/partials/row_weapon_desc.html')
            .success(function (data) { $templateCache.put('row_weapon_desc', data); })
            .error(function (reason) { alert(reason); });
    }
    fnRun.$inject = ['$templateCache', '$http'];
    /**
    *
    */
    angular.module('crusaderMarketApp', [
            'ngRoute',
            'smart-table',
            'ui.bootstrap',

            'cm.controllers'
        ])
        .config(fnConfig)
        .run(fnRun);
    /**
    *
    */
    exports.init = function () {
        angular.element(document).ready(function () {
            angular.bootstrap(document, [ 'crusaderMarketApp' ]);
        });
    };
});
