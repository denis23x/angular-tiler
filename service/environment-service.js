(function () {
    'use strict';
    angular.module('app').service('EnvironmentService', [ function () {

        var version = 'v1';

        return {
            apiMain: function () {
                return 'https://api.dribbble.com/'+ version +'/';
            }
        };
    }])
})();