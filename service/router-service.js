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
            }

            ];

            return states;
        };

    })

})();