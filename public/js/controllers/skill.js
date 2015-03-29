/**
*
*/
(function (angular, _) {
    'use strict';

    function SkillCtrl($scope, $compile) {
        /**
        *   Locals
        */
        var originData = [];

        $scope.$watch('shared.skills', function (skills) {
            if (!skills) {
                return;
            }
            originData = skills;

            // $scope.classTypes = _.uniq(_.pluck(skills, '클래스'));
            $scope.skills = skills;
        });
        /**
        *   func
        */
        $scope.filterSkills = function () {
            var currType = $scope.currType;
            var rst;

            // filter class type
            if (!currType || currType === '전체') {
                rst = originData;
            }
            else {
                rst = _.where(originData, { classType: $scope.currType });
            }

            // filter contract only or not
            var isSuper = $scope.isSuper;
            var isNoSuper = $scope.isNoSuper;
            if (isSuper ^ isNoSuper) { // xor
                if (!isSuper) {
                    rst = _.filter(rst, function (hero) {
                        return !hero.isSuper;
                    });
                }
                if (!isNoSuper) {
                    rst = _.filter(rst, function (hero) {
                        return hero.isSuper;
                    });
                }
            }

            $scope.skills = rst;
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
            $scope.filterSkills();
        };
        $scope.selectType = function (type) {
            $scope.currType = type.heading;
            $scope.filterSkills();
        };
        /**
        *   Grid
        */
        $scope.skills = originData;

        $scope.convIconUrl = function (classType) {
            return {
                '워리어': 'img/icon_warrior.png',
                '팔라딘': 'img/icon_paladin.png',
                '아처': 'img/icon_archer.png',
                '헌터': 'img/icon_hunter.png',
                '위자드': 'img/icon_wizard.png',
                '프리스트': 'img/icon_priest.png'
            }[classType];
        };

        $scope.toggleDesc = function (event, skill) {
            // enable xs screen
            var screenWidth = angular.element(document).width();
            if (screenWidth > 767) {
                return;
            }

            skill.isOpened = !skill.isOpened;

            var $target = angular.element(event.target);
            var $tr = $target.parents('tr');

            // create open row
            if (!$tr.next('.open-row').length) {
                // tr
                //     td(colspan="6").well {{skills[0]['설명']}}
                var template = [
                    '<tr class="open-row hidden-md hidden-sm" ng-show="skill.isOpened">',
                        '<td colspan="6" class="well">',
                            '<h5 bold-keyword="skill.desc"></h5>',
                        '</td>',
                    '</tr>'
                ].join('');

                var newScope = $scope.$new({});
                newScope.skill = skill;

                $tr.after($compile(template)(newScope));
            }
        };
    }
    SkillCtrl.$inject = ['$scope', '$compile'];
    /**
    *
    */
    angular.module('cm.controllers')
        .controller('SkillCtrl', SkillCtrl);

})(angular, _);
