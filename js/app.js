(function () {
    'use strict';
    angular.module('app',[
        'ui.router',
        'angularGrid',
        'ngAnimate',
        'ngSanitize',
        'pascalprecht.translate',
        'oc.lazyLoad'
        // 'angular-loading-bar'
    ])
    .config(MainConfig)
    .run(MainRun)
    .controller('MainController', MainController);

    MainConfig.$inject = ['$sceDelegateProvider', 'RouterServiceProvider', '$stateProvider', '$locationProvider', '$urlRouterProvider', '$translateProvider', 'TranslateServiceProvider', '$httpProvider', 'AuthServiceProvider', 'APIServiceProvider'];
    function MainConfig($sceDelegateProvider, RouterServiceProvider, $stateProvider, $locationProvider, $urlRouterProvider, $translateProvider, TranslateServiceProvider, $httpProvider, AuthServiceProvider, APIServiceProvider) {
        $urlRouterProvider.otherwise('/');
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: true
        });

        //  Allowed links for API
        $sceDelegateProvider.resourceUrlWhitelist([
            'self',
            'https://api.dribbble.com/**',
            'http://api.tiler.com/**'
        ]);

        //  Register app states
        RouterServiceProvider.$get().getStates().forEach(function(state) {
            $stateProvider.state(state);
        });

        //  Cache http queries
        // $httpProvider.defaults.cache = true;

        // Set auth token
        if (AuthServiceProvider.$get().authenticatedUser()) {
            $httpProvider.defaults.headers.common['Authorization'] = 'Bearer ' + JSON.parse(localStorage.getItem('auth-token'));
            // APIServiceProvider.$get().loadCollections(JSON.parse(localStorage.getItem('auth-data')).id);
        }

        //  Register languages
        $translateProvider.useSanitizeValueStrategy('sce');
        $translateProvider.registerAvailableLanguageKeys(['en', 'ru']);
        $translateProvider.preferredLanguage('ru');
        $translateProvider.translations('ru', TranslateServiceProvider.$get().russianLanguage());
        $translateProvider.translations('en', TranslateServiceProvider.$get().englishLanguage());
    }

    MainRun.$inject = ['$rootScope'];
    function MainRun ($rootScope) {
        var run = this;

    }

    //  TRUE = only if have html directive: ng-controller="mainController as main" - in index.php
    MainController.$inject = ['$transitions'];
    function MainController($transitions) {
        var main = this,
            restrictedArea = [
                'settings',
                'profile',
                'collections',
                'create'
            ];
        //  Watch on user auth condition
        $transitions.onStart({ to: restrictedArea }, function(transition) {
            var auth = transition.injector().get('AuthService');
            if (!auth.authenticatedUser()) {
                return transition.router.stateService.target('home.auth');
            }
        });
    }

})();