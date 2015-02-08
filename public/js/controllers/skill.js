/**
*
*/
(function (angular, _) {
    'use strict';

    function SkillCtrl($scope, $http) {
        /**
        *   Locals
        */
        var originData = [];

        function loadData () {
            $http.get('/skills')
                .success(function (data) {
                    originData = data;

                    // $scope.classTypes = _.uniq(_.pluck(data, '클래스'));
                    $scope.skills = data;
                })
                .error(function (reason) {
                    alert(reason);
                });
        }
        // init
        loadData();
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
            $scope.skills = originData;
        };
        $scope.selectType = function (type) {
            $scope.currType = type.heading;
            $scope.skills = _.where(originData, { '클래스': type.heading });
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

            var $target = angular.element(event.target);
            var $tr = $target.parents('tr');

            skill.isOpened = !skill.isOpened;
            if (skill.isOpened) {
                // tr
                //     td(colspan="6").well {{skills[0]['설명']}}
                var template = [
                    '<tr class="open-row hidden-md hidden-sm">',
                        '<td colspan="6" class="well">',
                            skill['설명'],
                        '</td>',
                    '</tr>'
                ].join('');

                $tr.after(template);
            }
            else {
                $tr.next('.open-row').remove();
            }
        };
    }
    SkillCtrl.$inject = ['$scope', '$http'];
    /**
    *
    */
    angular.module('cm.controllers')
        .controller('SkillCtrl', SkillCtrl);

})(angular, _);