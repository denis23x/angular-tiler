(function () {
    'use strict';
    angular.module('app').service('AuthService', ['CommonService', 'EnvironmentService', '$rootScope', function (CommonService, EnvironmentService, $rootScope) {
        return {
            registrationUser: function (data) {
                return CommonService.post(EnvironmentService.apiRoot() + 'users', data)
                    .then(function (response) {
                        response.success = true;
                        return response;
                    })
                    .catch(function(response) {
                        return response;
                    });
            },
            authorizationUser: function (data) {
                return CommonService.post(EnvironmentService.apiRoot() + 'auth', data)
                    .then(function (response) {
                        localStorage.setItem('auth-token', JSON.stringify(response.token));
                        delete response.token;
                        localStorage.setItem('auth-data', JSON.stringify(response));
                        $rootScope.$emit('userAuthenticated');
                        response.success = true;
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
                        $rootScope.$emit('userAuthenticated');
                        return response;
                    })
                    .catch(function(response) {
                        return response;
                    });
            },
            registrationBySocial: function (key) {
                return window.location.replace(EnvironmentService.socialRegistrationPath(key));
            }
        };
    }])
})();