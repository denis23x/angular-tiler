(function () {
    'use strict';
    angular.module('app')
        .controller('ErrorController', ErrorController);

    ErrorController.$inject = ['APIService', '$rootScope'];
    function ErrorController(APIService, $rootScope) {
        var error = this;


    }

})();