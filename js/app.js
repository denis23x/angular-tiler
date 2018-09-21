(function () {
    'use strict';
    angular.module('app',[
        'ui.router',
        'angularGrid',
        'ngAnimate',
        'ngSanitize',
        'pascalprecht.translate',
        'oc.lazyLoad'
    ])
    .config(MainConfig)
    .run(MainRun)
    .controller('MainController', MainController)
    .factory('cacheInterceptor', ['$cacheFactory', function($cacheFactory) {
        var http_ttl_cache = {};
        return {
            request: function(config) {
                var N;
                if (config.timeToLive) {
                    config.cache = true;
                    N = config.timeToLive;
                    delete config.timeToLive;
                    if (new Date().getTime() - (http_ttl_cache[config.url] || 0) > N) {
                        $cacheFactory.get('$http').remove(config.url);
                        http_ttl_cache[config.url] = new Date().getTime();
                    }
                }
                return config;
            }
        };
    }]);

    MainConfig.$inject = ['$sceDelegateProvider', 'RouterServiceProvider', '$stateProvider', '$locationProvider', '$urlRouterProvider', '$translateProvider', 'TranslateServiceProvider', '$httpProvider'];
    function MainConfig($sceDelegateProvider, RouterServiceProvider, $stateProvider, $locationProvider, $urlRouterProvider, $translateProvider, TranslateServiceProvider, $httpProvider) {
        $urlRouterProvider.otherwise('/');
        $httpProvider.interceptors.push('cacheInterceptor');
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: true
        });

        //  Allowed links for API
        $sceDelegateProvider.resourceUrlWhitelist([
            'self',
            'http://api.tiler.com/**'
        ]);

        //  Register app states
        RouterServiceProvider.$get().getStates().forEach(function(state) {
            $stateProvider.state(state);
        });

        //  Register languages
        $translateProvider.useSanitizeValueStrategy('sce');
        $translateProvider.registerAvailableLanguageKeys(['en', 'ru']);
        $translateProvider.preferredLanguage('en');
        $translateProvider.translations('ru', TranslateServiceProvider.$get().russianLanguage());
        $translateProvider.translations('en', TranslateServiceProvider.$get().englishLanguage());
    }

    MainRun.$inject = ['$location', 'AuthService', '$http'];
    function MainRun ($location, AuthService, $http) {
        var run = this;

        //  Set auth token
        if (AuthService.userIsLogin()) {
            var token = JSON.parse(localStorage.getItem('auth-token')),
                hash;

            token.hasOwnProperty('access_token') ? hash = token.access_token : hash = token;
            $http.defaults.headers.common['Authorization'] = 'Bearer ' + hash;
        }

        if ($location.search().token !== undefined) {
            AuthService.authorizationByToken($location.search().token);
            $location.url($location.path());
        }
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
            if (!auth.userIsLogin()) {
                return transition.router.stateService.target('home.auth');
            }
        });
    }

})();