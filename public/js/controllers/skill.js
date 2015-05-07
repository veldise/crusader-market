/**
*
*/
define(function (require) {
    'use strict';

    var angular = require('angular');
    var _ = require('lodash');
    /**
    *
    */
    SkillCtrl.$inject = ['$scope', '$http', '$compile', '$templateCache'];
    function SkillCtrl($scope, $http, $compile, $templateCache) {
        /**
        *   Locals
        */
        var lvProps = [
            'lv1_desc',
            'lv1_up_cond',
            'lv2_desc',
            'lv2_up_cond',
            'lv3_desc',
            'lv3_up_cond',
            'lv4_desc',
            'lv4_up_cond',
            'lv5_desc',
            'lv5_up_cond'
        ];

        var originData = [];
        var shared = $scope.shared; // from main

        if (!shared.skills || !shared.skills.length) {
            $http.get('/skills')
                .success(function (data) {

                    // convert
                    var allLv = $scope.allLv;

                    data = _.map(data, function (skill) {
                        var rst = _.omit(skill, lvProps);
                        rst.currLv = Math.min(allLv, skill.max_level);
                        rst.lvs = [null];

                        var lvs = _.values(_.pick(skill, lvProps));
                        for (var i=0, l=lvs.length; i<l; i+=2) {
                            var lv = {
                                desc: lvs[i],
                                up_cond: lvs[i+1]
                            };
                            rst.lvs.push(lv);
                        }

                        return rst;
                    });

                    shared.skills = data;
                    originData = data;
                    $scope.skills = data;
                })
                .error(function (reason) { alert(reason); });
        }
        else {
            originData = shared.skills;
            $scope.skills = shared.skills;
        }
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
        *   button group
        */
        $scope.allLv = 5;
        $scope.$watch('allLv', function (allLv) {
            if (!allLv) {
                return;
            }
            _.each(originData, function (skill) {
                skill.currLv = Math.min(allLv, skill.max_level);
            });
            _.each($scope.skills, function (skill) {
                skill.currLv = Math.min(allLv, skill.max_level);
            });
        });
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
                var template = $templateCache.get('row_skill_desc');

                // var newScope = $scope.$new({});
                // newScope.skill = skill;
                $tr.after($compile(template)($tr.scope()));
            }
        };

        $scope.getCondText = function (skill) {
            if (skill.currLv === 1) {
                return '해제';
            }
            else if (skill.currLv === skill.max_level) {
                return '초월';
            }
            else {
                return '레벨업';
            }
        };
        $scope.minusLv = function (skill) {
            skill.currLv = Math.max(skill.currLv - 1, 0);
        };
        $scope.plusLv = function (skill) {
            skill.currLv = Math.min(skill.currLv + 1, skill.max_level);
        };
        $scope.setMinLv = function (skill) {
            skill.currLv = 1;
        };
        $scope.setMaxLv = function (skill) {
            skill.currLv = skill.max_level;
        };
    }

    return SkillCtrl;
});
