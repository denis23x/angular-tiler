(function () {
    'use strict';
    angular.module('app').service('CommonService', ['$q','$http', function ($q, $http) {
        return {
            displaySize: function () {
                var w = window.innerWidth,
                    h = window.innerHeight,
                    size = 'Unknown';

                if (w >= 1200) { size = 'Extra large';
                } else if (w >= 992) { size = 'Large';
                } else if (w >= 768) { size = 'Medium';
                } else if (w >= 576) { size = 'Small';
                } else { size = 'Extra small';
                }

                return w+'x'+h+' > '+size;
            },
            post: function(url, req, cfg) {
                var deferred = $q.defer();

                $http.post(url, req ? req : {}, cfg ? cfg : {}).then(function(data) {
                    deferred.resolve(data.data);
                }, function (reason) {
                    deferred.reject(reason);
                });

                return deferred.promise;
            },
            get: function(url) {
                var deferred = $q.defer();

                $http.get(url).then(function(data) {
                    deferred.resolve(data.data);
                }, function (reason) {
                    deferred.reject(reason);
                });

                return deferred.promise;
            },
            delete: function(url) {
                var deferred = $q.defer();

                $http.delete(url).then(function(data) {
                    deferred.resolve(data.data);
                }, function (reason) {
                    deferred.reject(reason);
                });

                return deferred.promise;
            },
            put: function(url, req) {
                var deferred = $q.defer();

                $http.put(url, req ? req : {}).then(function(data) {
                    deferred.resolve(data.data);
                }, function (reason) {
                    deferred.reject(reason);
                });

                return deferred.promise;
            },
            patch: function(url, req) {
                var deferred = $q.defer();

                $http.patch(url, req ? req : {}).then(function(data) {
                    deferred.resolve(data.data);
                }, function (reason) {
                    deferred.reject(reason);
                });

                return deferred.promise;
            }
        }
    }])

})();