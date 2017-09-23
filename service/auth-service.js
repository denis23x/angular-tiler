(function () {
    'use strict';
    angular.module('app').service('AuthService', ['CommonService', 'EnvironmentService', '$rootScope', '$http', '$state', function (CommonService, EnvironmentService, $rootScope, $http, $state) {
        return {
            registrationUser: function (data) {
                return CommonService.post(EnvironmentService.apiRoot() + 'users', data)
                    .then(function (response) {
                        return response;
                    })
                    .catch(function(response) {
                        return response;
                    });
            },
            authorizationUser: function (data) {
                return CommonService.post(EnvironmentService.apiRoot() + 'auth', data)
                    .then(function (response) {
                        $http.defaults.headers.common['Authorization'] = 'Bearer ' + response.token;
                        localStorage.setItem('auth-token', JSON.stringify(response.token)); delete response.token;
                        localStorage.setItem('auth-data', JSON.stringify(response));
                        $rootScope.$broadcast('userAuthenticated');
                        return response;
                    })
                    .catch(function(response) {
                        return response;
                    });
            },
            authenticatedUser: function () {
                return localStorage.getItem('auth-token') !== null ? JSON.parse(localStorage.getItem('auth-data')) : false;
            },
            updateUserSettings: function (id, data) {
                return CommonService.put(EnvironmentService.apiRoot() + 'users/' + id, data)
                    .then(function (response) {
                        localStorage.setItem('auth-data', JSON.stringify(response));
                        $rootScope.$broadcast('userAuthenticated');
                        return response;
                    })
                    .catch(function(response) {
                        return response;
                    });
            },
            userLogoutUser: function () {
                delete $http.defaults.headers.common.Authorization;
                localStorage.removeItem('auth-data');
                localStorage.removeItem('auth-token');
                $state.go('home');
                $rootScope.$broadcast('userLogout');
            },
            registrationBySocial: function (key) {
                return window.location.replace(EnvironmentService.socialRegistrationPath(key));
            }
        };
    }])
})();