(function () {
    'use strict';
    angular.module('app')
        .controller('UsersController', UsersController);

    UsersController.$inject = ['APIService'];
    function UsersController(APIService) {
        var users = this;

        APIService.loadUsers().then(function(content) {
            console.log(content);
            users.list = content;
        });

    }

})();