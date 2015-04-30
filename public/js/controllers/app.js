/**
*
*/
define([
    'angular',
    './hero.js',
    './skill.js',
    './weapon.js',
    './bread.js'
], function (angular, HeroCtrl, SkillCtrl, WeaponCtrl, BreadCalcCtrl) {
    'use strict';

    return angular.module('cm.controllers', [])
        .controller('HeroCtrl', HeroCtrl)
        .controller('SkillCtrl', SkillCtrl)
        .controller('WeaponCtrl', WeaponCtrl)
        .controller('BreadCalcCtrl', BreadCalcCtrl)
        .filter('num2rank', function () {
            return function (num) {
                return '+' + ((num >= 5) ? 'MAX' : (num + ''));
            };
        });
});
