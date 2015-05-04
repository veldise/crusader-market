/**
*
*/
define(function (require) {
    'use strict';

    var angular = require('angular');

    var MainCtrl = require('./main.js');
    var HeroCtrl = require('./hero.js');
    var HeroDiffCtrl = require('./hero_diff.js');
    var SkillCtrl = require('./skill.js');
    var WeaponCtrl = require('./weapon.js');
    var BreadCalcCtrl = require('./bread.js');
    /**
    *
    */
    return angular.module('cm.controllers', [])
        .controller('MainCtrl', MainCtrl)
        .controller('HeroCtrl', HeroCtrl)
        .controller('HeroDiffCtrl', HeroDiffCtrl)
        .controller('SkillCtrl', SkillCtrl)
        .controller('WeaponCtrl', WeaponCtrl)
        .controller('BreadCalcCtrl', BreadCalcCtrl)
        .filter('num2rank', function () {
            return function (num) {
                return '+' + ((num >= 5) ? 'MAX' : (num + ''));
            };
        })
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
        });
});
