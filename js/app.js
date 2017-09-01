(function () {
    'use strict';
    angular.module('app',[
        'ui.router',
        'angularGrid',
        'ngAnimate',
        'ngSanitize',
        'pascalprecht.translate'
    ])
    .config(MainConfig)
    .run(MainRun)
    .controller('MainController', MainController);

    MainConfig.$inject = ['$sceDelegateProvider', 'RouterServiceProvider', '$stateProvider', '$locationProvider', '$urlRouterProvider', '$translateProvider', 'TranslateServiceProvider'];
    function MainConfig($sceDelegateProvider, RouterServiceProvider, $stateProvider, $locationProvider, $urlRouterProvider, $translateProvider, TranslateServiceProvider) {
        $urlRouterProvider.otherwise('/');
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: true
        });

        //  Allowed links for API
        $sceDelegateProvider.resourceUrlWhitelist([
            'self',
            'https://api.dribbble.com/**'
        ]);

        //  Register app states
        RouterServiceProvider.$get().getStates().forEach(function(state) {
            $stateProvider.state(state);
        });

        //  Register languages
        $translateProvider.useSanitizeValueStrategy('sce');
        $translateProvider.preferredLanguage('en');
        $translateProvider.translations('ru', TranslateServiceProvider.$get().russianLanguage());
        $translateProvider.translations('en', TranslateServiceProvider.$get().englishLanguage());
    }

    MainRun.$inject = ['$rootScope'];
    function MainRun ($rootScope) {
        var run = this;

    }

    //  TRUE = only if have html directive: ng-controller="mainController as main" - in index.php
    MainController.$inject = ['$http', '$scope', '$rootScope'];
    function MainController($http, $scope, $rootScope) {
        var main = this;

    }


})();