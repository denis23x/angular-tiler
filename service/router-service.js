(function () {
    'use strict';
    angular.module('app').service('RouterService', function () {

        this.getStates = function () {
            var states = [{
                name: 'home',
                url: '/asd',
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
                views: {
                    'modal@home': {
                        component: 'modalComponent'
                    }
                }
            },{
                name: 'settings',
                url: '/settings',
                templateUrl: 'templates/pages/settings.html'
            },{
                name: 'about',
                url: '/',
                templateUrl: 'templates/pages/about.html'
            }

            ];

            return states;
        };

    })

})();