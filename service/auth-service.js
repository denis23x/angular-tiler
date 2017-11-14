(function () {
    'use strict';
    angular.module('app').service('AuthService', ['CommonService', 'EnvironmentService', '$rootScope', '$http', '$state', 'APIService', function (CommonService, EnvironmentService, $rootScope, $http, $state, APIService) {
        var service = {
            authorizationUser: function (data) {
                return CommonService.post(EnvironmentService.apiDomain() + 'oauth/token', data)
                    .then(function (response) {
                        var token = JSON.parse(atob(response.access_token.split('.')[1]));
                        $http.defaults.headers.common['Authorization'] = 'Bearer ' + response.access_token;
                        localStorage.setItem('auth-token', JSON.stringify(response));
                        service.userData(token.sub);
                        return response;
                    })
                    .catch(function(response) {
                        return response;
                    });
            },
            authorizationByToken: function (token) {
                $http.defaults.headers.common['Authorization'] = 'Bearer ' + token;
                localStorage.setItem('auth-token', JSON.stringify(token));
                service.userData(JSON.parse(atob(token.split('.')[1])).sub);
            },
            passportData: function (type) {
                switch(type) {
                    case 'grant_type':
                        return 'password'; break;
                    case 'client_id':
                        return '1'; break;
                    case 'client_secret':
                        return '51xEsQj1qUzdsqs6LD6U5TPlH1A2hQFeHD4t3JY5'; break;
                    default:
                        return false; break;
                }
            },
            registrationUser: function (data) {
                return CommonService.post(EnvironmentService.apiRoot() + 'users', data)
                    .then(function (response) {
                        return response;
                    })
                    .catch(function(response) {
                        return response;
                    });
            },
            registrationBySocial: function (key) {
                return window.location.replace(EnvironmentService.socialRegistrationPath(key));
            },
            userData: function (id) {
                return CommonService.get(EnvironmentService.apiRoot() + 'users/' + id)
                    .then(function (response) {
                        localStorage.setItem('user-data', JSON.stringify(response));
                        $rootScope.$broadcast('userRefresh');

                        //  Update collections
                        APIService.loadCollections(response.id).then(function (response) {
                            localStorage.setItem('user-collections', JSON.stringify(response));
                            $rootScope.$broadcast('refreshCollections');
                        });

                        return response;
                    })
                    .catch(function(response) {
                        return response;
                    });
            },
            userIsLogin: function () {
                if (localStorage.getItem('auth-token') !== null) {
                    var token = JSON.parse(atob(localStorage.getItem('auth-token').split('.')[1])),
                        currentUnixTime = Math.floor((new Date()).getTime() / 1000);

                    //  If token expired
                    if (currentUnixTime > token.exp) {
                        alert('NEED REFRESH TOKEN !!!');
                    } else {
                        return true;
                    }
                }
            },
            updateUserSettings: function (id, data) {
                return CommonService.put(EnvironmentService.apiRoot() + 'users/' + id, data)
                    .then(function (response) {
                        localStorage.setItem('user-data', JSON.stringify(response));
                        $rootScope.$broadcast('userRefresh');
                        return response;
                    })
                    .catch(function(response) {
                        return response;
                    });
            },
            userLogout: function () {
                delete $http.defaults.headers.common.Authorization;
                localStorage.removeItem('auth-token');
                localStorage.removeItem('user-data');
                localStorage.removeItem('user-collections');
                $state.go('home');
                $rootScope.$broadcast('userRefresh');
                $rootScope.$broadcast('refreshCollections');
            }
        };
        return service;
    }])
})();