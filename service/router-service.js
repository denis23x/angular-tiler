(function () {
    'use strict';
    angular.module('app').service('RouterService', function () {
        this.getStates = function () {
            var states = [{
                name: 'home',
                url: '/',
                component: 'gridComponent',
                resolve: {
                    posts: function (APIService) {
                        return APIService.loadManyPosts();
                    }
                }
            },{
                name: 'home.post',
                url: 'post/:id',
                params: {
                    type: 'post'
                },
                resolve: {
                    post: function (APIService, $stateParams) {
                        return APIService.loadPost($stateParams.id);
                    }
                },
                views: {
                    'modal@home': {
                        component: 'modalComponent',
                        bindings: {
                            post: 'post'
                        }
                    }
                }
            },{
                name: 'home.auth',
                url: 'auth',
                params: {
                    type: 'auth'
                },
                resolve: {
                    avatars: function (APIService) {
                        return APIService.loadDefaultAvatars();
                    }
                },
                views: {
                    'modal@home': {
                        component: 'modalComponent',
                        bindings: {
                            post: 'avatars'
                        }
                    }
                }
            },{
                name: 'about',
                url: '/about',
                controller: 'AboutController',
                templateUrl: 'views/about/about.html',
                resolve: {
                    loadDependencies: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load('views/about/about.js');
                    }]
                }
            },{
                name: 'collections',
                url: '/collections',
                controller: 'CollectionsController',
                templateUrl: 'views/collections/collections.html',
                resolve: {
                    loadDependencies: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load('views/collections/collections.js');
                    }]
                }
            },{
                name: 'create',
                url: '/create',
                controller: 'CreateController',
                templateUrl: 'views/create/create.html',
                resolve: {
                    loadDependencies: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'node_modules/summernote/dist/summernote-bs4.css',
                            'node_modules/summernote/dist/summernote-bs4.js',
                            'node_modules/angular-summernote/dist/angular-summernote.min.js',
                            'node_modules/html2canvas/dist/html2canvas.js',
                            'css/summernote-skin.css',
                            'views/create/create.js'
                        ], {serie: true});
                    }]
                }
            },{
                name: 'profile',
                url: '/profile',
                controller: 'ProfileController',
                templateUrl: 'views/profile/profile.html',
                resolve: {
                    loadDependencies: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load('views/profile/profile.js');
                    }]
                }
            },{
                name: 'settings',
                url: '/settings',
                controller: 'SettingsController',
                templateUrl: 'views/settings/settings.html',
                resolve: {
                    loadDependencies: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load('views/settings/settings.js');
                    }]
                }
            },{
                name: 'users',
                url: '/users',
                controller: 'UsersController',
                templateUrl: 'views/users/users.html',
                resolve: {
                    loadDependencies: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load('views/users/users.js');
                    }]
                }
            },{
                name: 'error',
                url: '/error',
                controller: 'ErrorController',
                templateUrl: 'views/error/error.html',
                resolve: {
                    loadDependencies: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load('views/error/error.js');
                    }]
                }
            }


            ];

            return states;
        };
    })

})();