(function () {
    'use strict';
    angular.module('app').directive('imageBase64',['$q', function ($q) {
        return {
            restrict: 'EA',
            scope: {
                ngModel: '=',
                result: '=result',
                loader: '=loader',
                error: '=error'
            },
            link: function(scope, element, attrs) {
                var validUrl = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z‌​]{2,6}\b([-a-zA-Z0-9‌​@:%_\+.~#?&=]*)/;
                switch(attrs.type) {
                    case 'text':
                        scope.$watch('ngModel', function (url) {
                            if (typeof url === 'string' && url.length !== 0) {
                                if (validUrl.test(url)) {
                                    var xhr = new XMLHttpRequest(),
                                        deferred = $q.defer(),
                                        proxyUrl = 'https://cors-anywhere.herokuapp.com/';

                                    scope.loader = true;
                                    xhr.open('GET', ((url.indexOf(window.location.origin) === -1) ? proxyUrl + url : url), true);
                                    xhr.responseType = 'blob';
                                    xhr.onreadystatechange = function (xhr) {
                                        if (xhr.currentTarget.status !== 200) {
                                            scope.loader = false;
                                            scope.error = 'Not valid url';
                                        } else {
                                            scope.error = false;
                                        }
                                    };
                                    xhr.onload = function (e) {
                                        var reader = new FileReader();
                                        reader.onload = function(event) {deferred.resolve(event.target.result);};
                                        reader.onerror = function() {deferred.reject(this);};
                                        reader.readAsDataURL(this.response);
                                    };
                                    xhr.send();

                                    deferred.promise.then(function (base64) {
                                        if (xhr.status === 200) {
                                            scope.result = base64;
                                            scope.loader = false;
                                        }
                                    });
                                } else {
                                    scope.error = 'Not valid url';
                                }
                            } else {
                                scope.error = false;
                            }
                        });
                        break;
                    case 'file':
                        element.change(function(event){
                            var deferred = $q.defer(),
                                reader = new FileReader(),
                                file = event.currentTarget.files[0];

                            reader.onload = function(file) {deferred.resolve(file.target.result);};
                            reader.onerror = function() {deferred.reject(file);};
                            reader.readAsDataURL(file);

                            deferred.promise.then(function (base64) {
                                scope.result = base64;
                            });
                        });
                        break;
                    default:
                        break
                }
            }
        }
    }])
})();