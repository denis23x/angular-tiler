(function () {
    'use strict';
    angular.module('app').service('EnvironmentService', [ function () {

        var version = 'v1',
            currentAdress = window.location.origin;

        return {
            currentSite: function () {
                return currentAdress + '/';
            },
            apiDomain: function () {
                return 'http://api.tiler.com/';
            },
            apiRoot: function () {
                return 'http://api.tiler.com/api/' + version + '/';
            },
            socialRegistrationPath: function (key) {
                return 'http://api.tiler.com/socialite/' + key + '?auth_url=http://tiler&registration_url=http://tiler/auth';
            }
        };
    }])
})();