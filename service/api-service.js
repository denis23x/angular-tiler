(function () {
    'use strict';
    angular.module('app').service('APIService', ['$q', '$http', 'CommonService', 'EnvironmentService', function ($q, $http, CommonService, EnvironmentService) {
        return {
            loadManyPosts: function (data) {
                return CommonService.get(EnvironmentService.apiMain() + 'shots/?per_page=24&page=1&access_token=3df6bcfc60b54b131ac04f132af615e60b0bd0b1cadca89a4761cd5d125d608f');
                // return CommonService.get(EnvironmentService.apiMain() + 'shots/' + (data ? '?' + data : ''));
            },
            loadPost: function (id) {
                return CommonService.get(EnvironmentService.apiMain() + 'shots/' + id + '/?access_token=3df6bcfc60b54b131ac04f132af615e60b0bd0b1cadca89a4761cd5d125d608f');
            },
            loadDefaultAvatars: function () {
                return CommonService.get(EnvironmentService.currentSite() + 'json/default-avatars.json');
            },
            registrationUser: function (data) {
                return CommonService.post(EnvironmentService.apiRoot() + 'users/', data);
            },
            getUser: function () {
                return CommonService.get('http://api.tiler.com/api/v1/posts');
            }
        };
    }])
})();