(function () {
    'use strict';
    angular.module('app').service('EnvironmentService', [ function () {

        var version = 'v1',
            currentAdress = window.location.origin;

        return {
            apiMain: function () {
                return 'https://api.dribbble.com/'+ version +'/';
            },
            currentSite: function () {
                return currentAdress + '/';
            },
            apiRoot: function () {
                return 'http://api.tiler.com/api/' + version + '/';
            },
            socialRegistrationPath: function (key) {
                return 'http://api.tiler.com/api/' + version + '/auth/' + key + '?callback_url=http://tiler/auth';
            }
        };
    }])
})();