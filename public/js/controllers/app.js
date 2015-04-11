/**
*
*/
define([
    'angular',
    './hero.js',
    './skill.js',
    './bread.js'
], function (angular, HeroCtrl, SkillCtrl, BreadCalcCtrl) {
    'use strict';

    return angular.module('cm.controllers', [])
        .controller('HeroCtrl', HeroCtrl)
        .controller('SkillCtrl', SkillCtrl)
        .controller('BreadCalcCtrl', BreadCalcCtrl)
        .filter('num2rank', function () {
            return function (num) {
                return '+' + ((num >= 5) ? 'MAX' : (num + ''));
            };
        });
});
