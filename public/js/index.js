/**
*
*/
requirejs.config({
    baseUrl: './',
    paths: {
        'jquery': '/lib/jquery/jquery-1.11.2.min',
        'lodash': '/lib/lodash.min',

        'angular': '/lib/angular/angular.min',
        'angular-route': '/lib/angular/angular-route.min',

        'bootstrap': '/lib/bootstrap-3.3.4/js/bootstrap.min',
        'ui-bootstrap': '/lib/ui-bootstrap-tpls-0.13.0.min',

        'smart-table': '/lib/smart-table.min'
    },

    shim: {
        'jquery': { exports: '$' },
        'lodash': { exports: '_' },

        'angular': { exports: 'angular', deps: ['jquery'] },
        'angular-route': ['angular'],

        'bootstrap': ['jquery'],
        'ui-bootstrap': ['angular'],

        'smart-table': ['angular']
    },
    waitSeconds: 60
});
/**
*
*/
requirejs([
    '/js/app.js'
], function (app) {
    'use strict';

    app.init();
});
