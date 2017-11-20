(function () {
    'use strict';
    angular.module('app').service('APIService', ['CommonService', 'EnvironmentService', '$rootScope', function (CommonService, EnvironmentService, $rootScope) {
        var service = {
            loadPosts: function (query) {
                return CommonService.get(EnvironmentService.apiRoot() + 'posts' + (query ? query : ''))
                    .then(function (response) {
                        return response;
                    })
                    .catch(function (response) {
                        return response;
                    })
            },
            loadPostsByUser: function (id) {
                return CommonService.get(EnvironmentService.apiRoot() + 'users/' + id + '/posts')
                    .then(function (response) {
                        return response;
                    })
                    .catch(function (response) {
                        return response;
                    })
            },
            loadPost: function (id) {
                return CommonService.get(EnvironmentService.apiRoot() + 'posts/' + id);
            },
            loadDefaultAvatars: function () {
                return CommonService.get(EnvironmentService.currentSite() + 'json/default-avatars.json');
            },
            loadCategories: function () {
                return CommonService.get(EnvironmentService.apiRoot() + 'categories');
            },
            loadCollections: function (id) {
                return CommonService.get(EnvironmentService.apiRoot() + 'users/' + id + '/collections')
                    .then(function (response) {
                        localStorage.setItem('user-collections', JSON.stringify(response));
                        $rootScope.$broadcast('refreshCollections');
                        return response;
                    })
                    .catch(function(response) {
                        return response;
                    });
            },
            loadUsers: function () {
                return CommonService.get(EnvironmentService.apiRoot() + 'users')
                    .then(function (response) {
                        return response;
                    })
                    .catch(function(response) {
                        return response;
                    });
            },
            createCollection: function (data) {
                return CommonService.post(EnvironmentService.apiRoot() + 'users/' + data.user_id + '/collections', data)
                    .then(function (response) {
                        service.loadCollections(data.user_id);
                        return response;
                    })
                    .catch(function(response) {
                        return response;
                    });
            },
            createPost: function (data) {
                return CommonService.post(EnvironmentService.apiRoot() + 'users/' + data.user_id + '/posts', data)
                    .then(function (response) {
                        return response;
                    })
                    .catch(function(response) {
                        return response;
                    });
            }

        };
        return service;
    }])
})();