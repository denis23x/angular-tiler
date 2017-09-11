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
            getBase64: function (url, file) {
                if (file) {
                    var deferred = $q.defer(),
                        reader = new FileReader();

                    reader.onload = function(file) {
                        deferred.resolve(file.target.result);
                    };

                    reader.onerror = function() {
                        deferred.reject(file);
                    };

                    reader.readAsDataURL(file);

                    return deferred.promise;
                } else {
                    var xhr = new XMLHttpRequest(),
                        deferred = $q.defer(),
                        proxyUrl = 'https://cors-anywhere.herokuapp.com/';

                    xhr.open('GET', proxyUrl + url, true);
                    xhr.responseType = 'blob';
                    xhr.onload = function (e) {
                        var reader = new FileReader();

                        reader.onload = function(event) {
                            deferred.resolve(event.target.result);
                        };

                        reader.onerror = function() {
                            deferred.reject(this);
                        };

                        reader.readAsDataURL(this.response);
                    };
                    xhr.send();

                    return deferred.promise;
                }
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
                    deferred.resolve(reason);
                });

                return deferred.promise;
            },
            delete: function(url) {
                var deferred = $q.defer();

                $http.delete(url).then(function(data) {
                    deferred.resolve(data.data);
                }, function (reason) {
                    deferred.resolve(reason);
                });

                return deferred.promise;
            },
            put: function(url, req) {
                var deferred = $q.defer();

                $http.put(url, req ? req : {}).then(function(data) {
                    deferred.resolve(data.data);
                }, function (reason) {
                    deferred.resolve(reason);
                });

                return deferred.promise;
            },
            patch: function(url, req) {
                var deferred = $q.defer();

                $http.patch(url, req ? req : {}).then(function(data) {
                    deferred.resolve(data.data);
                }, function (reason) {
                    deferred.resolve(reason);
                });

                return deferred.promise;
            }
        }
    }])

})();