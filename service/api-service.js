(function () {
    'use strict';
    angular.module('app').service('APIService', ['CommonService', 'EnvironmentService', '$rootScope', function (CommonService, EnvironmentService, $rootScope) {
        var service = {
            loadManyPosts: function () {
                // return CommonService.get(EnvironmentService.apiRoot() + 'posts');
                return CommonService.get(EnvironmentService.apiMain() + 'shots/?per_page=24&page=1&access_token=3df6bcfc60b54b131ac04f132af615e60b0bd0b1cadca89a4761cd5d125d608f');
            },
            loadPost: function (id) {
                return CommonService.get(EnvironmentService.apiMain() + 'shots/' + id + '/?access_token=3df6bcfc60b54b131ac04f132af615e60b0bd0b1cadca89a4761cd5d125d608f');
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
            createCollection: function (data) {
                return CommonService.post(EnvironmentService.apiRoot() + 'users/' + data.user_id + '/collections', data)
                    .then(function (response) {
                        service.loadCollections(data.user_id);
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