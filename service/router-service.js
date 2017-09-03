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
                name: 'settings',
                url: '/settings',
                controller: 'SettingsController',
                templateUrl: 'templates/pages/settings.html'
            },{
                name: 'about',
                url: '/about',
                controller: 'AboutController',
                templateUrl: 'templates/pages/about.html'
            }

            ];

            return states;
        };

    })

})();